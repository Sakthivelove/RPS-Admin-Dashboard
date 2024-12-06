export function truncateAddress(value: string, length: number = 6): string {
    // Check if the value is a valid string and has sufficient length
    if (!value || value.length <= length * 2) {
        return value;
    }
    // Truncate the address, keeping the first `length` characters and the last `length` characters, and adding ellipsis in the middle
    return `${value.slice(0, length)}...${value.slice(-length)}`;
}

export const getContainerClass = (sidebarActive: boolean): string => {
    return `absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen`;
  };
  