"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface I_ContactUsDialogContext {
  isContactUsDialogOpen: boolean;
  openContactUsDialog: () => void;
  closeContactUsDialog: () => void;
}

const ContactUsDialogContext = createContext<
  I_ContactUsDialogContext | undefined
>(undefined);

interface ContactUsDialogProviderProps {
  children: ReactNode;
}

export const ContactUsDialogProvider: React.FC<ContactUsDialogProviderProps> = ({
  children,
}) => {
  const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

  const openContactUsDialog = () => setIsContactUsDialogOpen(true);
  const closeContactUsDialog = () => setIsContactUsDialogOpen(false);

  return (
    <ContactUsDialogContext.Provider
      value={{ isContactUsDialogOpen, openContactUsDialog, closeContactUsDialog }}
    >
      {children}
    </ContactUsDialogContext.Provider>
  );
};

export const useContactUsDialog = (): I_ContactUsDialogContext => {
  const context = useContext(ContactUsDialogContext);

  if (!context) {
    throw new Error(
      "useContactUsDialog must be used within a ContactUsDialogProvider"
    );
  }
  return context;
};
