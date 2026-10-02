import { ref } from 'vue';

// Small helper so every Studio tab reports save results the same way
export function useSaveStatus() {
  const busy = ref(false);
  const message = ref('');
  const error = ref('');

  const run = async (task: () => Promise<unknown>, successMessage = 'Saved.') => {
    busy.value = true;
    message.value = '';
    error.value = '';
    try {
      await task();
      message.value = successMessage;
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong.';
      return false;
    } finally {
      busy.value = false;
    }
  };

  return { busy, message, error, run };
}
