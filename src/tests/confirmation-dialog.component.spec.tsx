import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from 'common/components/confirmation-dialog/confirmation-dialog.component';

describe('confirmation-dialog.component specs', () => {
  it('should show the dialog in the document when feeds true to isOpen variable', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: '',
      labels: {
        closeButton: '',
        acceptButton: '',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialogElement = screen.getByRole('dialog');
    //Assert
    expect(dialogElement).toBeInTheDocument();
  });

  it("shouldn't show the dialog in the document when feeds false to isOpen variable", () => {
    //Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test button',
        acceptButton: 'test button',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialogElement = screen.queryByRole('dialog');
    //Assert
    expect(dialogElement).toBeNull();
  });

  it('should show mock texts in title and buttons when feeded with content', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'close',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const titleElement = screen.getByRole('heading');
    const buttonElementList = screen.getAllByRole('button');
    //Assert
    expect(titleElement).toBeInTheDocument();
    expect(buttonElementList[0]).toBeInTheDocument();
    expect(buttonElementList[1]).toBeInTheDocument();

    expect(titleElement).toHaveTextContent('test title');
    expect(buttonElementList[0]).toHaveTextContent('close');
    expect(buttonElementList[1]).toHaveTextContent('accept');
  });

  it('should call onClose && onAccept properties when it clicks on both buttons', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'close',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const buttonElementList = screen.getAllByRole('button');
    userEvent.click(buttonElementList[0]);
    userEvent.click(buttonElementList[1]);
    //Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should close the dialog when the Close button is clicked', async () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'close',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const buttonElementList = screen.getAllByRole('button');
    const dialogElement = screen.getByRole('dialog');
    userEvent.click(buttonElementList[0]);
    //Assert
    expect(props.onClose).toHaveBeenCalled();

    waitForElementToBeRemoved(dialogElement).then(() => {
      expect(dialogElement).not.toBeInTheDocument();
    });
  });

  it('should close the dialog when the Accept button is clicked', async () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'close',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const buttonElementList = screen.getAllByRole('button');
    const dialogElement = screen.getByRole('dialog');
    userEvent.click(buttonElementList[1]);
    //Assert
    expect(props.onAccept).toHaveBeenCalled();

    waitForElementToBeRemoved(dialogElement).then(() => {
      expect(dialogElement).not.toBeInTheDocument();
    });
  });
});
