import Swal from 'sweetalert2';

interface ConfirmDialogProps {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

const ConfirmDialog = ({
  title = 'Você tem certeza?',
  text = 'Esta ação é Irreversível.',
  confirmButtonText = 'Sim, excluir',
  cancelButtonText = 'Cancelar',
  confirmButtonColor = '#d33',
  cancelButtonColor = '#3085d6',
}: ConfirmDialogProps) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
  });
};

export default ConfirmDialog;
