export const stripAddr = (addr: string) => {
  return addr.slice(0, 6) + "..." + addr.slice(36, 42);
};
