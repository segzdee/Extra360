import { sanitize } from 'xss';

export const securityUtils = {
  sanitizeInput: (input: string): string => sanitize(input),
  
  validateFileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },
  
  sanitizeObject: <T extends Record<string, unknown>>(obj: T): T => {
    return Object.entries(obj).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: typeof value === 'string' ? sanitize(value) : value,
    }), {} as T);
  },
  
  validateImageDimensions: async (file: File, maxWidth: number, maxHeight: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img.width <= maxWidth && img.height <= maxHeight);
      };
      img.src = URL.createObjectURL(file);
    });
  }
};
