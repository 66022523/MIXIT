import { useState } from "react";

export default function BoxedTabs({ tabs, tabClass, tabContentClass, tabActive }) {
  const [active, setActive] = useState(tabActive || tabs[0].id);

  return (
    <>
      <div role="tablist" className={`tabs-boxed tabs ${tabClass}`}>
        {tabs.map((tab, index) => (
          <a
            role="tab"
            className={tab.id === active ? "tab tab-active" : "tab"}
            key={index}
            onClick={() => setActive(tab.id)}
          >
            {tab.name}
          </a>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          role="tabpanel"
          className={`tab-content ${tabContentClass}`}
          key={index}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
