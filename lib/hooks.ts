"use client";

import { useState, useEffect } from "react";

// Hook personalizado para manejar la hidratación de números
export function useFormattedNumber(value: number) {
  const [formattedValue, setFormattedValue] = useState(value.toString());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFormattedValue(value.toLocaleString());
  }, [value]);

  return isClient ? formattedValue : value.toString();
}
