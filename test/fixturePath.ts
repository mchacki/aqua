import * as path from 'path';

const fixturePath = (name: string): string => {
  const base = path.join(__dirname, '..');
  return path.join(base, 'fixtures', name);
};

export default fixturePath;