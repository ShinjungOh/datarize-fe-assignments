import { Box, Button, HStack, Input, Popover, Portal } from '@chakra-ui/react';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

type DateFilterProps = {
  from?: Date;
  to?: Date;
  onFromChange: (date?: Date) => void;
  onToChange: (date?: Date) => void;
  onSearch: () => void;
};

export const DateFilter = ({ from, to, onFromChange, onToChange, onSearch }: DateFilterProps) => {
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);

  const formatDate = (date?: Date) => (date ? date.toLocaleDateString('ko-KR') : '');

  const handleFromSelect = (date?: Date) => {
    onFromChange(date);
    if (date && to && date > to) {
      onToChange(undefined);
    }
    setActiveInput(null);
  };

  const handleToSelect = (date?: Date) => {
    onToChange(date);
    setActiveInput(null);
  };

  const handleSearch = () => {
    onSearch();
  };

  return (
    <HStack gap={2}>
      <Popover.Root open={activeInput === 'from'} onOpenChange={(e) => setActiveInput(e.open ? 'from' : null)}>
        <Popover.Trigger asChild>
          <Input placeholder="시작일" value={formatDate(from)} readOnly size="sm" w="140px" cursor="pointer" />
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Body>
                <DayPicker mode="single" selected={from} onSelect={handleFromSelect} locale={ko} defaultMonth={from} />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>

      <Box>~</Box>

      <Popover.Root open={activeInput === 'to'} onOpenChange={(e) => setActiveInput(e.open ? 'to' : null)}>
        <Popover.Trigger asChild>
          <Input placeholder="종료일" value={formatDate(to)} readOnly size="sm" w="140px" cursor="pointer" />
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Body>
                <DayPicker
                  mode="single"
                  selected={to}
                  onSelect={handleToSelect}
                  locale={ko}
                  defaultMonth={to}
                  disabled={from ? { before: from } : undefined}
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>

      <Button size="sm" onClick={handleSearch}>
        검색
      </Button>
    </HStack>
  );
};
