// Simulating an API call for account updates
export const updateAccount = async (data: { email: string }) => {
  return new Promise<{ success: boolean; data: { email: string } }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1500);
  });
};