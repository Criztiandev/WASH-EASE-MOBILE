import { useCallback, useEffect, useState } from "react";

const useMultiSelect = (initialData, form, name) => {
  const [selected, setSelected] = useState(initialData || []);

  const handleSelect = useCallback((checked, value) => {
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }, []);

  useEffect(() => {
    form.setValue(name, selected);
  }, [selected, form, name]);

  return { selected, handleSelect };
};

export default useMultiSelect;
