import React, { useEffect } from "react";

const Chatbox = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <df-messenger
        intent="WELCOME"
        chat-title="Hỗ trợ khách hàng"
        agent-id="a111a74a-8334-4098-9636-0f1433d6fc97"
        language-code="vi"
      ></df-messenger>
    </div>
  );
};

export default Chatbox;
