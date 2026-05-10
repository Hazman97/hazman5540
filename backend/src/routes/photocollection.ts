import { Hono } from 'hono'
import { Env } from '../types'

const photocollection = new Hono<{ Bindings: Env }>()

// ── Countries ───────────────────────────────────────────────

photocollection.get('/countries', async (c) => {
  const { results: countries } = await c.env.DB.prepare(
    'SELECT * FROM countries ORDER BY name ASC'
  ).all<{ id: string; name: string; created_at: string }>()

  const { results: locations } = await c.env.DB.prepare(
    'SELECT * FROM locations ORDER BY name ASC'
  ).all<{ id: string; country_id: string; name: string; created_at: string }>()

  const { results: photos } = await c.env.DB.prepare(
    'SELECT * FROM photos ORDER BY created_at DESC'
  ).all<{ id: string; location_id: string; url: string; caption: string; created_at: string }>()

  // Build nested structure
  const photosByLocation = photos.reduce<Record<string, typeof photos>>((acc, photo) => {
    if (!acc[photo.location_id]) acc[photo.location_id] = []
    acc[photo.location_id].push(photo)
    return acc
  }, {})

  const locationsByCountry = locations.reduce<Record<string, (typeof locations[0] & { images: typeof photos })[]>>((acc, loc) => {
    if (!acc[loc.country_id]) acc[loc.country_id] = []
    acc[loc.country_id].push({ ...loc, images: photosByLocation[loc.id] || [] })
    return acc
  }, {})

  const result = countries.map(c => ({
    ...c,
    locations: locationsByCountry[c.id] || []
  }))

  return c.json(result)
})

photocollection.post('/countries', async (c) => {
  const { name } = await c.req.json<{ name: string }>()
  if (!name) return c.json({ error: 'name required' }, 400)

  const existing = await c.env.DB.prepare('SELECT id FROM countries WHERE name = ?').bind(name).first()
  if (existing) return c.json({ error: 'Country already exists' }, 409)

  const result = await c.env.DB.prepare(
    'INSERT INTO countries (name) VALUES (?) RETURNING id, name'
  ).bind(name).first<{ id: string; name: string }>()

  return c.json(result, 201)
})

// ── Locations ───────────────────────────────────────────────

photocollection.post('/countries/:countryId/locations', async (c) => {
  const { countryId } = c.req.param()
  const { name } = await c.req.json<{ name: string }>()
  if (!name) return c.json({ error: 'name required' }, 400)

  const country = await c.env.DB.prepare('SELECT id FROM countries WHERE id = ?').bind(countryId).first()
  if (!country) return c.json({ error: 'Country not found' }, 404)

  const result = await c.env.DB.prepare(
    'INSERT INTO locations (country_id, name) VALUES (?, ?) RETURNING id, name, country_id'
  ).bind(countryId, name).first<{ id: string; name: string; country_id: string }>()

  return c.json(result, 201)
})

// ── Photos ──────────────────────────────────────────────────

// Get photos for a specific location
photocollection.get('/locations/:locationId/photos', async (c) => {
  const { locationId } = c.req.param()
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM photos WHERE location_id = ? ORDER BY created_at DESC'
  ).bind(locationId).all()
  return c.json(results)
})

// Add photo (proxy upload to bijokdev storage + store metadata)
photocollection.post('/upload', async (c) => {
  const body = await c.req.json<{ location_id: string; url: string; caption?: string }>()
  if (!body.location_id || !body.url) {
    return c.json({ error: 'location_id and url required' }, 400)
  }

  const result = await c.env.DB.prepare(
    'INSERT INTO photos (location_id, url, caption) VALUES (?, ?, ?) RETURNING id, url'
  ).bind(body.location_id, body.url, body.caption ?? null).first<{ id: string; url: string }>()

  return c.json(result, 201)
})

// Delete photo
photocollection.delete('/photos/:id', async (c) => {
  const { id } = c.req.param()
  const photo = await c.env.DB.prepare('SELECT url FROM photos WHERE id = ?').bind(id).first<{ url: string }>()
  if (!photo) return c.json({ error: 'Not found' }, 404)

  // Delete from D1
  await c.env.DB.prepare('DELETE FROM photos WHERE id = ?').bind(id).run()

  return c.json({ success: true, url: photo.url })
})

// Delete a country
photocollection.delete('/countries/:id', async (c) => {
  const { id } = c.req.param()
  await c.env.DB.prepare('DELETE FROM countries WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// Delete a location
photocollection.delete('/locations/:id', async (c) => {
  const { id } = c.req.param()
  await c.env.DB.prepare('DELETE FROM locations WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default photocollection
