import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface ISendFileTransmissionProviderProps {
  children: React.ReactNode;
}

type SendFileTransmissionContextType = {
  forwardedMessageFile: File | null;
  setForwardedMessageFile: (file: File | null) => void;
};

const SendFileTransmissionContext = createContext(
  {} as SendFileTransmissionContextType
);

export function SendFileTransmissionProvider({
  children,
}: ISendFileTransmissionProviderProps) {
  const [forwardedMessageFile, setForwardedMessageFile] = useState<File | null>(
    null
  );

  const { showTransmissionMessageModal } = useSelector(
    (state: RootState) => state.UserInterface
  );

  useEffect(() => {
    if (!showTransmissionMessageModal) {
      setForwardedMessageFile(null);
    }
  }, [showTransmissionMessageModal]);

  return (
    <SendFileTransmissionContext.Provider
      value={{ forwardedMessageFile, setForwardedMessageFile }}
    >
      {children}
    </SendFileTransmissionContext.Provider>
  );
}

export const useSendFileTransmissionContext = () =>
  useContext(SendFileTransmissionContext);
