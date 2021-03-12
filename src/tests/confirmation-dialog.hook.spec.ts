import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from 'common/components/confirmation-dialog/confirmation-dialog.hook';

describe('confirmation-dialog.hook specs', () => {
  it('should return an empty confirmation dialog', () => {
    //Arrange
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    //Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should close the dialog with mock lookup item', () => {
    //Arrange
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: 'test',
        name: 'test',
      });

      result.current.onClose();
    });

    //Assert
    expect(result.current.isOpen).toBeFalsy();
  });

  it('should open the dialog and set lookup item to delete', () => {
    //Arrange
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: 'test',
        name: 'test',
      });
    });

    //Assert
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete).toEqual({
      id: 'test',
      name: 'test',
    });
  });

  it('should set the item to delete to an new empty lookup item on Accept', () => {
    //Arrange
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: 'test',
        name: 'test',
      });

      result.current.onAccept();
    });

    //Assert
    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
  });
});
