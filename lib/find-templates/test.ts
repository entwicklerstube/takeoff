import { findTemplates } from './';

describe('find-templates', () => {
  it('returns an array', () => {
    expect(Array.isArray(findTemplates('./'))).toBe(true);
  });
});
