import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, ReactNode, memo } from 'react';

const style: SxProps<Theme> = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

interface Props {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  modalSX?: SxProps<Theme>;
  backdropSX?: SxProps<Theme>;
}

export const CustomModal: FC<Props> = memo(
  ({ open, onClose, children, modalSX, backdropSX }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: {
            sx: {
              ...backdropSX,
              backdropFilter: `blur(10px)`,
            },
          },
        }}
      >
        <Box sx={{ ...style, ...modalSX }}>{children}</Box>
      </Modal>
    );
  }
);

CustomModal.displayName = 'CustomModal';
