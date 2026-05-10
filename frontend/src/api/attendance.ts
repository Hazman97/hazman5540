import { api } from './client'

export interface Student {
  id: string
  name: string
  username: string
  department: string
  is_active: number
  created_at: string
}

export interface AttendanceLog {
  id: string
  student_id: string
  student_name: string
  clock_in_time: string | null
  clock_out_time: string | null
  is_clock_in_outside: number
  is_clock_out_outside: number
  clock_in_photo_url: string | null
  clock_out_photo_url: string | null
  total_hours: number | null
  reason: string | null
}

export interface LeaveRequest {
  id: string
  student_id: string
  student_name: string
  leave_type: string
  start_date: string
  end_date: string
  reason: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface AdminSettings {
  id: string
  office_lat: number | null
  office_lng: number | null
  geofence_radius: number
  updated_at: string
}

// Auth
export const attendanceApi = {
  // Students
  getStudents: () => api.get<Student[]>('/attendance/students', true),
  createStudent: (data: { name: string; username: string; password: string; department?: string }) =>
    api.post('/attendance/students', data, true),
  updateStudent: (id: string, data: Partial<Student & { password?: string }>) =>
    api.patch(`/attendance/students/${id}`, data, true),
  deleteStudent: (id: string) => api.delete(`/attendance/students/${id}`, undefined, true),

  // Clock
  clockIn: (data: { is_clock_in_outside?: boolean; clock_in_photo_url?: string; reason?: string }) =>
    api.post<{ id: string; clock_in_time: string }>('/attendance/clock-in', data, true),
  clockOut: (data: { log_id: string; is_clock_out_outside?: boolean; clock_out_photo_url?: string }) =>
    api.post('/attendance/clock-out', data, true),

  // Logs
  getLogs: (params?: { studentId?: string; startDate?: string; endDate?: string }) => {
    const qs = new URLSearchParams()
    if (params?.studentId) qs.set('studentId', params.studentId)
    if (params?.startDate) qs.set('startDate', params.startDate)
    if (params?.endDate) qs.set('endDate', params.endDate)
    const query = qs.toString() ? `?${qs}` : ''
    return api.get<AttendanceLog[]>(`/attendance/logs${query}`, true)
  },
  getTodayLog: () => api.get<AttendanceLog | null>('/attendance/today', true),

  // Settings
  getSettings: () => api.get<AdminSettings>('/attendance/settings', true),
  updateSettings: (data: Partial<AdminSettings>) => api.patch('/attendance/settings', data, true),

  // Leaves
  getLeaves: () => api.get<LeaveRequest[]>('/attendance/leaves', true),
  submitLeave: (data: { leave_type: string; start_date: string; end_date: string; reason?: string }) =>
    api.post('/attendance/leaves', data, true),
  updateLeave: (id: string, status: 'approved' | 'rejected') =>
    api.patch(`/attendance/leaves/${id}`, { status }, true),
}

export default attendanceApi
