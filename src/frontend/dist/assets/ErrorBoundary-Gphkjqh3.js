import { j as jsxRuntimeExports, T as TriangleAlert } from "./index-B0qZHuNS.js";
function ErrorState({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "alert-red rounded-md p-4 flex items-center gap-3",
      "data-ocid": "error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: message ?? "Failed to load data. Please try again." })
      ]
    }
  );
}
export {
  ErrorState as E
};
