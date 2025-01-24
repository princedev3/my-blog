"use client";
import React, { useEffect, useState } from "react";
import ModalProvider from "./modal-provider";

const GenralProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  return (
    <>
      <ModalProvider />
    </>
  );
};

export default GenralProvider;
