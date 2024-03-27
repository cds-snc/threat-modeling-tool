import { memo } from 'react';
import Button from '@cloudscape-design/components/button';

export default memo(({ saveHandler, saveState }: { saveHandler: () => void; saveState: boolean }) => {
  return (
    <Button variant='primary' onClick={saveHandler} disabled={saveState}>{saveState ? 'Saved' : 'Save'}</Button>
  );
});