"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default Providers;
