import { useEffect, useMemo, useRef, useState } from 'react';

import { DISTRICTS } from '../../data/districts.js';

/**
 * District picker with type-ahead suggestions (all 64 districts of Bangladesh).
 * Renders a hidden <select name="district"> so the value is available on the form
 * via `form.elements.district`, plus a visible search box with suggestions.
 */
export default function DistrictField({ label = 'District', required = true, onChange }) {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return DISTRICTS.filter((district) => district.toLowerCase().includes(needle)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.setCustomValidity(
      value || !required ? '' : 'Please select a district from the suggestions',
    );
  }, [value, required]);

  const select = (district) => {
    setQuery(district);
    setValue(district);
    setOpen(false);
    onChange?.(district);
  };

  const handleInput = (event) => {
    const next = event.target.value;
    setQuery(next);
    const exact = DISTRICTS.find((district) => district.toLowerCase() === next.trim().toLowerCase());
    if (exact) {
      setValue(exact);
      onChange?.(exact);
    } else {
      setValue('');
      onChange?.('');
    }
    setOpen(true);
  };

  return (
    <label className="district-field" ref={wrapperRef}>
      {label}
      {required && <sup>*</sup>}
      <input
        ref={inputRef}
        type="search"
        name="district-search"
        className="district-search"
        placeholder="Search district"
        autoComplete="off"
        required={required}
        aria-label="Search district"
        value={query}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
      />
      <div className="district-suggestions" role="listbox" hidden={!open || suggestions.length === 0}>
        {suggestions.map((district) => (
          <button
            key={district}
            type="button"
            className="district-suggestion"
            role="option"
            aria-selected={district === value}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => select(district)}
          >
            {district}
          </button>
        ))}
      </div>
      <select name="district" value={value} onChange={() => {}} style={{ display: 'none' }} tabIndex={-1}>
        <option value="">Select district</option>
        {DISTRICTS.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </label>
  );
}
