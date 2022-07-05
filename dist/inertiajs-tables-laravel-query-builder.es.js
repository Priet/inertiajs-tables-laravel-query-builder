import { ref, onMounted, onBeforeUnmount, openBlock, createElementBlock, renderSlot, watch, createBlock, withCtx, createElementVNode, normalizeClass, withModifiers, withDirectives, vShow, resolveDynamicComponent, toDisplayString, createCommentVNode, computed, Fragment, renderList, unref, createVNode, createTextVNode, nextTick, getCurrentInstance, onUnmounted, Transition } from "vue";
import { createPopper } from "@popperjs/core/lib/popper-lite";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import flip from "@popperjs/core/lib/modifiers/flip";
import uniq from "lodash-es/uniq";
import find from "lodash-es/find";
import qs from "qs";
import clone from "lodash-es/clone";
import filter from "lodash-es/filter";
import findKey from "lodash-es/findKey";
import forEach from "lodash-es/forEach";
import isEqual from "lodash-es/isEqual";
import map from "lodash-es/map";
import pickBy from "lodash-es/pickBy";
const _sfc_main$c = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const listener = ref(null);
    const root = ref(null);
    onMounted(() => {
      listener.value = (e) => {
        if (e.target === root.value || root.value.contains(e.target)) {
          return;
        }
        props.do();
      };
      document.addEventListener("click", listener.value);
      document.addEventListener("touchstart", listener.value);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", listener.value);
      document.removeEventListener("touchstart", listener.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 512);
    };
  }
};
const _hoisted_1$b = { class: "relative" };
const _hoisted_2$b = ["dusk", "disabled", "onClick"];
const _hoisted_3$a = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" };
const _sfc_main$b = {
  __name: "ButtonWithDropdown",
  props: {
    placement: {
      type: String,
      default: "bottom-start",
      required: false
    },
    active: {
      type: Boolean,
      default: false,
      required: false
    },
    dusk: {
      type: String,
      default: null,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const opened = ref(false);
    const popper = ref(null);
    function toggle() {
      opened.value = !opened.value;
    }
    function hide() {
      opened.value = false;
    }
    watch(opened, () => {
      popper.value.update();
    });
    const button = ref(null);
    const tooltip = ref(null);
    onMounted(() => {
      popper.value = createPopper(button.value, tooltip.value, {
        placement: props.placement,
        modifiers: [flip, preventOverflow]
      });
    });
    expose({ hide });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, { do: hide }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$b, [
            createElementVNode("button", {
              ref_key: "button",
              ref: button,
              type: "button",
              dusk: __props.dusk,
              disabled: __props.disabled,
              class: normalizeClass(["w-full bg-white border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", { "border-green-300": __props.active, "border-gray-300": !__props.active, "cursor-not-allowed": __props.disabled }]),
              "aria-haspopup": "true",
              onClick: withModifiers(toggle, ["prevent"])
            }, [
              renderSlot(_ctx.$slots, "button")
            ], 10, _hoisted_2$b),
            withDirectives(createElementVNode("div", {
              ref_key: "tooltip",
              ref: tooltip,
              class: "absolute z-10"
            }, [
              createElementVNode("div", _hoisted_3$a, [
                renderSlot(_ctx.$slots, "default")
              ])
            ], 512), [
              [vShow, opened.value]
            ])
          ])
        ]),
        _: 3
      });
    };
  }
};
const _hoisted_1$a = { class: "flex flex-row items-center" };
const _hoisted_2$a = { class: "uppercase" };
const _hoisted_3$9 = ["sorted"];
const _hoisted_4$6 = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
};
const _hoisted_5$5 = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
};
const _hoisted_6$5 = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
};
const _sfc_main$a = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    function onClick() {
      if (props.cell.sortable) {
        props.cell.onSort(props.cell.key);
      }
    }
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("th", null, [
        (openBlock(), createBlock(resolveDynamicComponent(__props.cell.sortable ? "button" : "div"), {
          class: "py-3 px-6 w-full",
          dusk: __props.cell.sortable ? `sort-${__props.cell.key}` : null,
          onClick: withModifiers(onClick, ["prevent"])
        }, {
          default: withCtx(() => [
            createElementVNode("span", _hoisted_1$a, [
              renderSlot(_ctx.$slots, "label", {}, () => [
                createElementVNode("span", _hoisted_2$a, toDisplayString(__props.cell.label), 1)
              ]),
              renderSlot(_ctx.$slots, "sort", {}, () => [
                __props.cell.sortable ? (openBlock(), createElementBlock("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: normalizeClass(["w-3 h-3 ml-2", {
                    "text-gray-400": !__props.cell.sorted,
                    "text-green-500": __props.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: __props.cell.sorted
                }, [
                  !__props.cell.sorted ? (openBlock(), createElementBlock("path", _hoisted_4$6)) : createCommentVNode("", true),
                  __props.cell.sorted === "asc" ? (openBlock(), createElementBlock("path", _hoisted_5$5)) : createCommentVNode("", true),
                  __props.cell.sorted === "desc" ? (openBlock(), createElementBlock("path", _hoisted_6$5)) : createCommentVNode("", true)
                ], 10, _hoisted_3$9)) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 3
        }, 8, ["dusk", "onClick"]))
      ], 512)), [
        [vShow, !__props.cell.hidden]
      ]);
    };
  }
};
const translationsObject = {
  translations: {
    next: "Next",
    no_results_found: "No results found",
    of: "of",
    per_page: "per page",
    previous: "Previous",
    results: "results",
    to: "to"
  }
};
function getTranslations() {
  return translationsObject.translations;
}
function setTranslation(key, value) {
  translationsObject.translations[key] = value;
}
function setTranslations(translations) {
  translationsObject.translations = translations;
}
const _hoisted_1$9 = ["dusk", "value"];
const _hoisted_2$9 = ["value"];
const _sfc_main$9 = {
  __name: "PerPageSelector",
  props: {
    dusk: {
      type: String,
      default: null,
      required: false
    },
    value: {
      type: Number,
      default: 15,
      required: false
    },
    options: {
      type: Array,
      default() {
        return [15, 30, 50, 100];
      },
      required: false
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const translations = getTranslations();
    const perPageOptions = computed(() => {
      let options = [...props.options];
      options.push(parseInt(props.value));
      return uniq(options).sort((a, b) => a - b);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("select", {
        name: "per_page",
        dusk: __props.dusk,
        value: __props.value,
        class: "block focus:ring-indigo-500 focus:border-indigo-500 min-w-max shadow-sm text-sm border-gray-300 rounded-md",
        onChange: _cache[0] || (_cache[0] = ($event) => __props.onChange($event.target.value))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(perPageOptions), (option) => {
          return openBlock(), createElementBlock("option", {
            key: option,
            value: option
          }, toDisplayString(option) + " " + toDisplayString(unref(translations).per_page), 9, _hoisted_2$9);
        }), 128))
      ], 40, _hoisted_1$9);
    };
  }
};
const _hoisted_1$8 = {
  key: 0,
  class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
};
const _hoisted_2$8 = { key: 0 };
const _hoisted_3$8 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 16l-4-4m0 0l4-4m-4 4h18"
  })
], -1);
const _hoisted_4$5 = { class: "hidden sm:inline ml-2" };
const _hoisted_5$4 = { class: "hidden sm:inline mr-2" };
const _hoisted_6$4 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M17 8l4 4m0 0l-4 4m4-4H3"
  })
], -1);
const _hoisted_7$4 = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
};
const _hoisted_8$3 = { class: "flex flex-row space-x-4 items-center flex-grow" };
const _hoisted_9$3 = { class: "hidden lg:block text-sm text-gray-700 flex-grow" };
const _hoisted_10 = { class: "font-medium" };
const _hoisted_11 = { class: "font-medium" };
const _hoisted_12 = { class: "font-medium" };
const _hoisted_13 = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
};
const _hoisted_14 = { class: "sr-only" };
const _hoisted_15 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
    "clip-rule": "evenodd"
  })
], -1);
const _hoisted_16 = { class: "sr-only" };
const _hoisted_17 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
    "clip-rule": "evenodd"
  })
], -1);
const _sfc_main$8 = {
  __name: "Pagination",
  props: {
    onClick: {
      type: Function,
      required: false
    },
    perPageOptions: {
      type: Array,
      default() {
        return () => [15, 30, 50, 100];
      },
      required: false
    },
    onPerPageChange: {
      type: Function,
      default() {
        return () => {
        };
      },
      required: false
    },
    hasData: {
      type: Boolean,
      required: true
    },
    meta: {
      type: Object,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const translations = getTranslations();
    const hasLinks = computed(() => {
      if (!("links" in pagination.value)) {
        return false;
      }
      return pagination.value.links.length > 0;
    });
    const hasPagination = computed(() => {
      return Object.keys(pagination.value).length > 0;
    });
    const pagination = computed(() => {
      return props.meta;
    });
    const previousPageUrl = computed(() => {
      if ("prev_page_url" in pagination.value) {
        return pagination.value.prev_page_url;
      }
      return null;
    });
    const nextPageUrl = computed(() => {
      if ("next_page_url" in pagination.value) {
        return pagination.value.next_page_url;
      }
      return null;
    });
    const perPage = computed(() => {
      return parseInt(pagination.value.per_page);
    });
    return (_ctx, _cache) => {
      return unref(hasPagination) ? (openBlock(), createElementBlock("nav", _hoisted_1$8, [
        !__props.hasData || unref(pagination).total < 1 ? (openBlock(), createElementBlock("p", _hoisted_2$8, toDisplayString(unref(translations).no_results_found), 1)) : createCommentVNode("", true),
        __props.hasData ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["flex-1 flex justify-between", { "sm:hidden": unref(hasLinks) }])
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(previousPageUrl) ? "a" : "div"), {
            class: normalizeClass([{
              "cursor-not-allowed text-gray-400": !unref(previousPageUrl),
              "text-gray-700 hover:text-gray-500": unref(previousPageUrl)
            }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
            href: unref(previousPageUrl),
            dusk: unref(previousPageUrl) ? "pagination-simple-previous" : null,
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => __props.onClick(unref(previousPageUrl)), ["prevent"]))
          }, {
            default: withCtx(() => [
              _hoisted_3$8,
              createElementVNode("span", _hoisted_4$5, toDisplayString(unref(translations).previous), 1)
            ]),
            _: 1
          }, 8, ["class", "href", "dusk"])),
          createVNode(_sfc_main$9, {
            dusk: "per-page-mobile",
            value: unref(perPage),
            options: __props.perPageOptions,
            "on-change": __props.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          (openBlock(), createBlock(resolveDynamicComponent(unref(nextPageUrl) ? "a" : "div"), {
            class: normalizeClass([{
              "cursor-not-allowed text-gray-400": !unref(nextPageUrl),
              "text-gray-700 hover:text-gray-500": unref(nextPageUrl)
            }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
            href: unref(nextPageUrl),
            dusk: unref(nextPageUrl) ? "pagination-simple-next" : null,
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => __props.onClick(unref(nextPageUrl)), ["prevent"]))
          }, {
            default: withCtx(() => [
              createElementVNode("span", _hoisted_5$4, toDisplayString(unref(translations).next), 1),
              _hoisted_6$4
            ]),
            _: 1
          }, 8, ["class", "href", "dusk"]))
        ], 2)) : createCommentVNode("", true),
        __props.hasData && unref(hasLinks) ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
          createElementVNode("div", _hoisted_8$3, [
            createVNode(_sfc_main$9, {
              dusk: "per-page-full",
              value: unref(perPage),
              options: __props.perPageOptions,
              "on-change": __props.onPerPageChange
            }, null, 8, ["value", "options", "on-change"]),
            createElementVNode("p", _hoisted_9$3, [
              createElementVNode("span", _hoisted_10, toDisplayString(unref(pagination).from), 1),
              createTextVNode(" " + toDisplayString(unref(translations).to) + " ", 1),
              createElementVNode("span", _hoisted_11, toDisplayString(unref(pagination).to), 1),
              createTextVNode(" " + toDisplayString(unref(translations).of) + " ", 1),
              createElementVNode("span", _hoisted_12, toDisplayString(unref(pagination).total), 1),
              createTextVNode(" " + toDisplayString(unref(translations).results), 1)
            ])
          ]),
          createElementVNode("div", null, [
            createElementVNode("nav", _hoisted_13, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(previousPageUrl) ? "a" : "div"), {
                class: normalizeClass([{
                  "cursor-not-allowed text-gray-400": !unref(previousPageUrl),
                  "text-gray-500 hover:bg-gray-50": unref(previousPageUrl)
                }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
                href: unref(previousPageUrl),
                dusk: unref(previousPageUrl) ? "pagination-previous" : null,
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => __props.onClick(unref(previousPageUrl)), ["prevent"]))
              }, {
                default: withCtx(() => [
                  createElementVNode("span", _hoisted_14, toDisplayString(unref(translations).previous), 1),
                  _hoisted_15
                ]),
                _: 1
              }, 8, ["class", "href", "dusk"])),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(pagination).links, (link, key) => {
                return openBlock(), createElementBlock("div", { key }, [
                  renderSlot(_ctx.$slots, "link", {}, () => [
                    !isNaN(link.label) || link.label === "..." ? (openBlock(), createBlock(resolveDynamicComponent(link.url ? "a" : "div"), {
                      key: 0,
                      href: link.url,
                      dusk: link.url ? `pagination-${link.label}` : null,
                      class: normalizeClass(["relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700", {
                        "cursor-not-allowed": !link.url,
                        "hover:bg-gray-50": link.url,
                        "bg-gray-100": link.active
                      }]),
                      onClick: withModifiers(($event) => __props.onClick(link.url), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(link.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["href", "dusk", "class", "onClick"])) : createCommentVNode("", true)
                  ])
                ]);
              }), 128)),
              (openBlock(), createBlock(resolveDynamicComponent(unref(nextPageUrl) ? "a" : "div"), {
                class: normalizeClass([{
                  "cursor-not-allowed text-gray-400": !unref(nextPageUrl),
                  "text-gray-500 hover:bg-gray-50": unref(nextPageUrl)
                }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
                href: unref(nextPageUrl),
                dusk: unref(nextPageUrl) ? "pagination-next" : null,
                onClick: _cache[3] || (_cache[3] = withModifiers(($event) => __props.onClick(unref(nextPageUrl)), ["prevent"]))
              }, {
                default: withCtx(() => [
                  createElementVNode("span", _hoisted_16, toDisplayString(unref(translations).next), 1),
                  _hoisted_17
                ]),
                _: 1
              }, 8, ["class", "href", "dusk"]))
            ])
          ])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$7 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    "clip-rule": "evenodd"
  })
], -1);
const _hoisted_2$7 = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
};
const _hoisted_3$7 = ["dusk", "onClick"];
const _sfc_main$7 = {
  __name: "TableAddSearchRow",
  props: {
    searchInputs: {
      type: Object,
      required: true
    },
    hasSearchInputsWithoutValue: {
      type: Boolean,
      required: true
    },
    onAdd: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const dropdown = ref(null);
    function enableSearch(key) {
      props.onAdd(key);
      dropdown.value.hide();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$b, {
        ref_key: "dropdown",
        ref: dropdown,
        dusk: "add-search-row-dropdown",
        disabled: !__props.hasSearchInputsWithoutValue,
        class: "w-auto"
      }, {
        button: withCtx(() => [
          _hoisted_1$7
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.searchInputs, (searchInput, key) => {
              return openBlock(), createElementBlock("button", {
                key,
                dusk: `add-search-row-${searchInput.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: withModifiers(($event) => enableSearch(searchInput.key), ["prevent"])
              }, toDisplayString(searchInput.label), 9, _hoisted_3$7);
            }), 128))
          ])
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
};
const _hoisted_1$6 = /* @__PURE__ */ createElementVNode("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }, null, -1);
const _hoisted_2$6 = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
  "clip-rule": "evenodd"
}, null, -1);
const _hoisted_3$6 = [
  _hoisted_1$6,
  _hoisted_2$6
];
const _hoisted_4$4 = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
};
const _hoisted_5$3 = { class: "px-2" };
const _hoisted_6$3 = { class: "divide-y divide-gray-200" };
const _hoisted_7$3 = { class: "text-sm text-gray-900" };
const _hoisted_8$2 = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"];
const _hoisted_9$2 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Column status", -1);
const _sfc_main$6 = {
  __name: "TableColumns",
  props: {
    columns: {
      type: Object,
      required: true
    },
    hasHiddenColumns: {
      type: Boolean,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$b, {
        placement: "bottom-end",
        dusk: "columns-dropdown",
        active: __props.hasHiddenColumns
      }, {
        button: withCtx(() => [
          (openBlock(), createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: normalizeClass(["h-5 w-5", {
              "text-gray-400": !__props.hasHiddenColumns,
              "text-green-400": __props.hasHiddenColumns
            }]),
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, _hoisted_3$6, 2))
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_4$4, [
            createElementVNode("div", _hoisted_5$3, [
              createElementVNode("ul", _hoisted_6$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(props.columns, (column, key) => {
                  return withDirectives((openBlock(), createElementBlock("li", {
                    key,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    createElementVNode("p", _hoisted_7$3, toDisplayString(column.label), 1),
                    createElementVNode("button", {
                      type: "button",
                      class: normalizeClass(["ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !column.hidden,
                        "bg-gray-200": column.hidden
                      }]),
                      "aria-pressed": !column.hidden,
                      "aria-labelledby": `toggle-column-${column.key}`,
                      "aria-describedby": `toggle-column-${column.key}`,
                      dusk: `toggle-column-${column.key}`,
                      onClick: withModifiers(($event) => __props.onChange(column.key, column.hidden), ["prevent"])
                    }, [
                      _hoisted_9$2,
                      createElementVNode("span", {
                        "aria-hidden": "true",
                        class: normalizeClass([{
                          "translate-x-5": !column.hidden,
                          "translate-x-0": column.hidden
                        }, "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"])
                      }, null, 2)
                    ], 10, _hoisted_8$2)
                  ])), [
                    [vShow, column.can_be_hidden]
                  ]);
                }), 128))
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["active"]);
    };
  }
};
const _hoisted_1$5 = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
  "clip-rule": "evenodd"
}, null, -1);
const _hoisted_2$5 = [
  _hoisted_1$5
];
const _hoisted_3$5 = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
};
const _hoisted_4$3 = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" };
const _hoisted_5$2 = { class: "p-2" };
const _hoisted_6$2 = ["name", "value", "onChange"];
const _hoisted_7$2 = ["value"];
const _sfc_main$5 = {
  __name: "TableFilter",
  props: {
    hasEnabledFilters: {
      type: Boolean,
      required: true
    },
    filters: {
      type: Object,
      required: true
    },
    onFilterChange: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$b, {
        placement: "bottom-end",
        dusk: "filters-dropdown",
        active: __props.hasEnabledFilters
      }, {
        button: withCtx(() => [
          (openBlock(), createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: normalizeClass(["h-5 w-5", {
              "text-gray-400": !__props.hasEnabledFilters,
              "text-green-400": __props.hasEnabledFilters
            }]),
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, _hoisted_2$5, 2))
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_3$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.filters, (filter2, key) => {
              return openBlock(), createElementBlock("div", { key }, [
                createElementVNode("h3", _hoisted_4$3, toDisplayString(filter2.label), 1),
                createElementVNode("div", _hoisted_5$2, [
                  filter2.type === "select" ? (openBlock(), createElementBlock("select", {
                    key: 0,
                    name: filter2.key,
                    value: filter2.value,
                    class: "block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm text-sm border-gray-300 rounded-md",
                    onChange: ($event) => __props.onFilterChange(filter2.key, $event.target.value)
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(filter2.options, (option, optionKey) => {
                      return openBlock(), createElementBlock("option", {
                        key: optionKey,
                        value: optionKey
                      }, toDisplayString(option), 9, _hoisted_7$2);
                    }), 128))
                  ], 40, _hoisted_6$2)) : createCommentVNode("", true)
                ])
              ]);
            }), 128))
          ])
        ]),
        _: 1
      }, 8, ["active"]);
    };
  }
};
const _hoisted_1$4 = { class: "relative" };
const _hoisted_2$4 = ["placeholder", "value"];
const _hoisted_3$4 = /* @__PURE__ */ createElementVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
  /* @__PURE__ */ createElementVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5 text-gray-400",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
      "clip-rule": "evenodd"
    })
  ])
], -1);
const _sfc_main$4 = {
  __name: "TableGlobalSearch",
  props: {
    label: {
      type: String,
      default: "Search...",
      required: false
    },
    value: {
      type: String,
      default: "",
      required: false
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createElementVNode("input", {
          class: "block w-full pl-9 text-sm rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          placeholder: __props.label,
          value: __props.value,
          type: "text",
          name: "global",
          onInput: _cache[0] || (_cache[0] = ($event) => __props.onChange($event.target.value))
        }, null, 40, _hoisted_2$4),
        _hoisted_3$4
      ]);
    };
  }
};
const _hoisted_1$3 = { class: "flex rounded-md shadow-sm relative mt-3" };
const _hoisted_2$3 = ["for"];
const _hoisted_3$3 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 mr-2 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    "clip-rule": "evenodd"
  })
], -1);
const _hoisted_4$2 = ["id", "name", "value", "onInput"];
const _hoisted_5$1 = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" };
const _hoisted_6$1 = ["dusk", "onClick"];
const _hoisted_7$1 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Remove search", -1);
const _hoisted_8$1 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1);
const _hoisted_9$1 = [
  _hoisted_7$1,
  _hoisted_8$1
];
const _sfc_main$3 = {
  __name: "TableSearchRows",
  props: {
    searchInputs: {
      type: Object,
      required: true
    },
    forcedVisibleSearchInputs: {
      type: Array,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    },
    onRemove: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const skipUnwrap = { el: ref([]) };
    let el = computed(() => skipUnwrap.el.value);
    function isForcedVisible(key) {
      return props.forcedVisibleSearchInputs.includes(key);
    }
    watch(props.forcedVisibleSearchInputs, (inputs) => {
      const latestInput = inputs.length > 0 ? inputs[inputs.length - 1] : null;
      if (!latestInput) {
        return;
      }
      nextTick().then(() => {
        const inputElement = find(el.value, (el2) => {
          return el2.__vnode.key === latestInput;
        });
        if (inputElement) {
          inputElement.focus();
        }
      });
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(__props.searchInputs, (searchInput, key) => {
        return withDirectives((openBlock(), createElementBlock("div", {
          key,
          class: "px-4 sm:px-0"
        }, [
          createElementVNode("div", _hoisted_1$3, [
            createElementVNode("label", {
              for: searchInput.key,
              class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
            }, [
              _hoisted_3$3,
              createElementVNode("span", null, toDisplayString(searchInput.label), 1)
            ], 8, _hoisted_2$3),
            (openBlock(), createElementBlock("input", {
              id: searchInput.key,
              ref_for: true,
              ref: skipUnwrap.el,
              key: searchInput.key,
              name: searchInput.key,
              value: searchInput.value,
              type: "text",
              class: "flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300",
              onInput: ($event) => __props.onChange(searchInput.key, $event.target.value)
            }, null, 40, _hoisted_4$2)),
            createElementVNode("div", _hoisted_5$1, [
              createElementVNode("button", {
                class: "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                dusk: `remove-search-row-${searchInput.key}`,
                onClick: withModifiers(($event) => __props.onRemove(searchInput.key), ["prevent"])
              }, _hoisted_9$1, 8, _hoisted_6$1)
            ])
          ])
        ])), [
          [vShow, searchInput.value !== null || isForcedVisible(searchInput.key)]
        ]);
      }), 128);
    };
  }
};
const _hoisted_1$2 = /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 mr-2 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    "clip-rule": "evenodd"
  })
], -1);
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("span", null, "Reset", -1);
const _hoisted_3$2 = [
  _hoisted_1$2,
  _hoisted_2$2
];
const _sfc_main$2 = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: "w-full bg-white border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-gray-300",
        "aria-haspopup": "true",
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => __props.onClick && __props.onClick(...args), ["prevent"]))
      }, _hoisted_3$2, 512);
    };
  }
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
const _hoisted_1$1 = { class: "flex flex-col" };
const _hoisted_2$1 = { class: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" };
const _hoisted_3$1 = { class: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" };
const _hoisted_4$1 = { class: "shadow border-b border-gray-200 relative" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("div", _hoisted_2$1, [
      createElementVNode("div", _hoisted_3$1, [
        createElementVNode("div", _hoisted_4$1, [
          renderSlot(_ctx.$slots, "default")
        ])
      ])
    ])
  ]);
}
var TableWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _hoisted_1 = ["dusk", "disabled"];
const _hoisted_2 = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" };
const _hoisted_3 = { class: "order-2 sm:order-1 mr-2 sm:mr-4" };
const _hoisted_4 = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:flex-grow order-1 sm:order-2 mb-2 sm:mb-0 sm:mr-4"
};
const _hoisted_5 = {
  key: 0,
  class: "order-5 sm:order-3 sm:mr-4 ml-auto"
};
const _hoisted_6 = { class: "min-w-full divide-y divide-gray-200 bg-white" };
const _hoisted_7 = { class: "bg-gray-50" };
const _hoisted_8 = { class: "font-medium text-xs uppercase text-left tracking-wider text-gray-500 py-3 px-6" };
const _hoisted_9 = { class: "bg-white divide-y divide-gray-200" };
const _sfc_main = {
  __name: "Table",
  props: {
    name: {
      type: String,
      default: "default",
      required: false
    },
    striped: {
      type: Boolean,
      default: false,
      required: false
    },
    preventOverlappingRequests: {
      type: Boolean,
      default: true,
      required: false
    },
    inputDebounceMs: {
      type: Number,
      default: 350,
      required: false
    },
    preserveScroll: {
      type: [Boolean, String],
      default: false,
      required: false
    },
    resource: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    },
    meta: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const app = getCurrentInstance();
    const $inertia = app.appContext.config.globalProperties.$inertia;
    const queryBuilderProps = ref($inertia.page.props.queryBuilderProps ? $inertia.page.props.queryBuilderProps[props.name] || {} : {});
    const queryBuilderData = ref(queryBuilderProps.value);
    const pageName = computed(() => {
      return queryBuilderProps.value.pageName;
    });
    const forcedVisibleSearchInputs = ref([]);
    const tableFieldset = ref(null);
    const hasOnlyData = computed(() => {
      if (queryBuilderProps.value.hasToggleableColumns) {
        return false;
      }
      if (queryBuilderProps.value.hasFilters) {
        return false;
      }
      if (queryBuilderProps.value.hasSearchInputs) {
        return false;
      }
      if (queryBuilderProps.value.globalSearch) {
        return false;
      }
      return true;
    });
    const resourceData = computed(() => {
      if (Object.keys(props.resource).length === 0) {
        return props.data;
      }
      if ("data" in props.resource) {
        return props.resource.data;
      }
      return props.resource;
    });
    const resourceMeta = computed(() => {
      if (Object.keys(props.resource).length === 0) {
        return props.meta;
      }
      if ("links" in props.resource && "meta" in props.resource) {
        if (Object.keys(props.resource.links).length === 4 && "next" in props.resource.links && "prev" in props.resource.links) {
          return {
            ...props.resource.meta,
            next_page_url: props.resource.links.next,
            prev_page_url: props.resource.links.prev
          };
        }
      }
      if ("meta" in props.resource) {
        return props.resource.meta;
      }
      return props.resource;
    });
    const hasData = computed(() => {
      if (resourceData.value.length > 0) {
        return true;
      }
      if (resourceMeta.value.total > 0) {
        return true;
      }
      return false;
    });
    function disableSearchInput(key) {
      forcedVisibleSearchInputs.value = forcedVisibleSearchInputs.value.filter((search) => search != key);
      changeSearchInputValue(key, null);
    }
    function showSearchInput(key) {
      forcedVisibleSearchInputs.value.push(key);
    }
    const updates = ref(0);
    const canBeReset = computed(() => {
      if (forcedVisibleSearchInputs.value.length > 0) {
        return true;
      }
      const queryStringData = qs.parse(location.search.substring(1));
      const page = queryStringData[pageName.value];
      if (page > 1) {
        return true;
      }
      const prefix = props.name === "default" ? "" : props.name + "_";
      let dirty = false;
      forEach(["filter", "columns", "cursor", "sort"], (key) => {
        const value = queryStringData[prefix + key];
        if (key === "sort" && value === queryBuilderProps.value.defaultSort) {
          return;
        }
        if (value !== void 0) {
          dirty = true;
        }
      });
      return dirty;
    });
    function resetQuery() {
      forcedVisibleSearchInputs.value = [];
      forEach(queryBuilderData.value.filters, (filter2, key) => {
        queryBuilderData.value.filters[key].value = null;
      });
      forEach(queryBuilderData.value.searchInputs, (filter2, key) => {
        queryBuilderData.value.searchInputs[key].value = null;
      });
      forEach(queryBuilderData.value.columns, (column, key) => {
        queryBuilderData.value.columns[key].hidden = column.can_be_hidden ? !queryBuilderProps.value.defaultVisibleToggleableColumns.includes(column.key) : false;
      });
      queryBuilderData.value.sort = null;
      queryBuilderData.value.cursor = null;
      queryBuilderData.value.page = 1;
    }
    const debounceTimeouts = {};
    function changeSearchInputValue(key, value) {
      clearTimeout(debounceTimeouts[key]);
      debounceTimeouts[key] = setTimeout(() => {
        if (visitCancelToken.value && props.preventOverlappingRequests) {
          visitCancelToken.value.cancel();
        }
        const intKey = findDataKey("searchInputs", key);
        queryBuilderData.value.searchInputs[intKey].value = value;
        queryBuilderData.value.cursor = null;
        queryBuilderData.value.page = 1;
      }, props.inputDebounceMs);
    }
    function changeGlobalSearchValue(value) {
      changeSearchInputValue("global", value);
    }
    function changeFilterValue(key, value) {
      const intKey = findDataKey("filters", key);
      queryBuilderData.value.filters[intKey].value = value;
      queryBuilderData.value.cursor = null;
      queryBuilderData.value.page = 1;
    }
    function onPerPageChange(value) {
      queryBuilderData.value.cursor = null;
      queryBuilderData.value.perPage = value;
      queryBuilderData.value.page = 1;
    }
    function findDataKey(dataKey, key) {
      return findKey(queryBuilderData.value[dataKey], (value) => {
        return value.key == key;
      });
    }
    function changeColumnStatus(key, visible) {
      const intKey = findDataKey("columns", key);
      queryBuilderData.value.columns[intKey].hidden = !visible;
    }
    function getFilterForQuery() {
      let filtersWithValue = {};
      forEach(queryBuilderData.value.searchInputs, (searchInput) => {
        if (searchInput.value !== null) {
          filtersWithValue[searchInput.key] = searchInput.value;
        }
      });
      forEach(queryBuilderData.value.filters, (filters) => {
        if (filters.value !== null) {
          filtersWithValue[filters.key] = filters.value;
        }
      });
      return filtersWithValue;
    }
    function getColumnsForQuery() {
      const columns = queryBuilderData.value.columns;
      let visibleColumns = filter(columns, (column) => {
        return !column.hidden;
      });
      let visibleColumnKeys = map(visibleColumns, (column) => {
        return column.key;
      }).sort();
      if (isEqual(visibleColumnKeys, queryBuilderProps.value.defaultVisibleToggleableColumns)) {
        return {};
      }
      return visibleColumnKeys;
    }
    function dataForNewQueryString() {
      const filterForQuery = getFilterForQuery();
      const columnsForQuery = getColumnsForQuery();
      const queryData = {};
      if (Object.keys(filterForQuery).length > 0) {
        queryData.filter = filterForQuery;
      }
      if (Object.keys(columnsForQuery).length > 0) {
        queryData.columns = columnsForQuery;
      }
      const cursor = queryBuilderData.value.cursor;
      const page = queryBuilderData.value.page;
      const sort = queryBuilderData.value.sort;
      const perPage = queryBuilderData.value.perPage;
      if (cursor) {
        queryData.cursor = cursor;
      }
      if (page > 1) {
        queryData.page = page;
      }
      if (perPage > 1) {
        queryData.perPage = perPage;
      }
      if (sort) {
        queryData.sort = sort;
      }
      return queryData;
    }
    function generateNewQueryString() {
      const queryStringData = qs.parse(location.search.substring(1));
      const prefix = props.name === "default" ? "" : props.name + "_";
      forEach(["filter", "columns", "cursor", "sort"], (key) => {
        delete queryStringData[prefix + key];
      });
      delete queryStringData[pageName.value];
      forEach(dataForNewQueryString(), (value, key) => {
        if (key === "page") {
          queryStringData[pageName.value] = value;
        } else if (key === "perPage") {
          queryStringData.perPage = value;
        } else {
          queryStringData[prefix + key] = value;
        }
      });
      let query = qs.stringify(queryStringData, {
        filter(prefix2, value) {
          if (typeof value === "object" && value !== null) {
            return pickBy(value);
          }
          return value;
        },
        skipNulls: true,
        strictNullHandling: true
      });
      if (!query || query === pageName.value + "=1") {
        query = "";
      }
      return query;
    }
    const isVisiting = ref(false);
    const visitCancelToken = ref(null);
    function visit(url) {
      if (!url) {
        return;
      }
      $inertia.get(url, {}, {
        replace: true,
        preserveState: true,
        preserveScroll: props.preserveScroll !== false,
        onBefore() {
          if (isVisiting.value && props.preventOverlappingRequests) {
            return false;
          }
          isVisiting.value = true;
        },
        onCancelToken(cancelToken) {
          visitCancelToken.value = cancelToken;
        },
        onFinish() {
          isVisiting.value = false;
        },
        onSuccess() {
          if ("queryBuilderProps" in $inertia.page.props) {
            queryBuilderProps.value = $inertia.page.props.queryBuilderProps[props.name] || {};
            queryBuilderData.value.cursor = queryBuilderProps.value.cursor;
            queryBuilderData.value.page = queryBuilderProps.value.page;
          }
          if (props.preserveScroll === "table-top") {
            const offset = -8;
            const top = tableFieldset.value.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({ top });
          }
          updates.value++;
        }
      });
    }
    watch(queryBuilderData, () => {
      visit(location.pathname + "?" + generateNewQueryString());
    }, { deep: true });
    const inertiaListener = () => {
      updates.value++;
    };
    onMounted(() => {
      document.addEventListener("inertia:success", inertiaListener);
    });
    onUnmounted(() => {
      document.removeEventListener("inertia:success", inertiaListener);
    });
    function sortBy(column) {
      if (queryBuilderData.value.sort == column) {
        queryBuilderData.value.sort = `-${column}`;
      } else {
        queryBuilderData.value.sort = column;
      }
      queryBuilderData.value.cursor = null;
      queryBuilderData.value.page = 1;
    }
    function show(key) {
      const intKey = findDataKey("columns", key);
      return !queryBuilderData.value.columns[intKey].hidden;
    }
    function header(key) {
      const intKey = findDataKey("columns", key);
      const columnData = clone(queryBuilderProps.value.columns[intKey]);
      columnData.onSort = sortBy;
      return columnData;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, null, {
        default: withCtx(() => [
          (openBlock(), createElementBlock("fieldset", {
            ref_key: "tableFieldset",
            ref: tableFieldset,
            key: `table-${__props.name}`,
            dusk: `table-${__props.name}`,
            class: normalizeClass(["min-w-0", { "opacity-75": isVisiting.value }]),
            disabled: __props.preventOverlappingRequests && isVisiting.value
          }, [
            createElementVNode("div", _hoisted_2, [
              createElementVNode("div", _hoisted_3, [
                renderSlot(_ctx.$slots, "tableFilter", {
                  hasFilters: queryBuilderProps.value.hasFilters,
                  hasEnabledFilters: queryBuilderProps.value.hasEnabledFilters,
                  filters: queryBuilderProps.value.filters,
                  onFilterChange: changeFilterValue
                }, () => [
                  queryBuilderProps.value.hasFilters ? (openBlock(), createBlock(_sfc_main$5, {
                    key: 0,
                    "has-enabled-filters": queryBuilderProps.value.hasEnabledFilters,
                    filters: queryBuilderProps.value.filters,
                    "on-filter-change": changeFilterValue
                  }, null, 8, ["has-enabled-filters", "filters"])) : createCommentVNode("", true)
                ])
              ]),
              queryBuilderProps.value.globalSearch ? (openBlock(), createElementBlock("div", _hoisted_4, [
                renderSlot(_ctx.$slots, "tableGlobalSearch", {
                  hasGlobalSearch: queryBuilderProps.value.globalSearch,
                  label: queryBuilderProps.value.globalSearch ? queryBuilderProps.value.globalSearch.label : null,
                  value: queryBuilderProps.value.globalSearch ? queryBuilderProps.value.globalSearch.value : null,
                  onChange: changeGlobalSearchValue
                }, () => [
                  queryBuilderProps.value.globalSearch ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    class: "flex-grow",
                    label: queryBuilderProps.value.globalSearch.label,
                    value: queryBuilderProps.value.globalSearch.value,
                    "on-change": changeGlobalSearchValue
                  }, null, 8, ["label", "value"])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "tableReset", {
                canBeReset: "canBeReset",
                onClick: resetQuery
              }, () => [
                unref(canBeReset) ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  createVNode(_sfc_main$2, { "on-click": resetQuery })
                ])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "tableAddSearchRow", {
                hasSearchInputs: queryBuilderProps.value.hasSearchInputs,
                hasSearchInputsWithoutValue: queryBuilderProps.value.hasSearchInputsWithoutValue,
                searchInputs: queryBuilderProps.value.searchInputsWithoutGlobal,
                onAdd: showSearchInput
              }, () => [
                queryBuilderProps.value.hasSearchInputs ? (openBlock(), createBlock(_sfc_main$7, {
                  key: 0,
                  class: "order-3 sm:order-4 mr-2 sm:mr-4",
                  "search-inputs": queryBuilderProps.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": queryBuilderProps.value.hasSearchInputsWithoutValue,
                  "on-add": showSearchInput
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "tableColumns", {
                hasColumns: queryBuilderProps.value.hasToggleableColumns,
                columns: queryBuilderProps.value.columns,
                hasHiddenColumns: queryBuilderProps.value.hasHiddenColumns,
                onChange: changeColumnStatus
              }, () => [
                queryBuilderProps.value.hasToggleableColumns ? (openBlock(), createBlock(_sfc_main$6, {
                  key: 0,
                  class: "order-4 mr-4 sm:mr-0 sm:order-5",
                  columns: queryBuilderProps.value.columns,
                  "has-hidden-columns": queryBuilderProps.value.hasHiddenColumns,
                  "on-change": changeColumnStatus
                }, null, 8, ["columns", "has-hidden-columns"])) : createCommentVNode("", true)
              ])
            ]),
            renderSlot(_ctx.$slots, "tableSearchRows", {
              hasSearchRowsWithValue: queryBuilderProps.value.hasSearchInputsWithValue,
              searchInputs: queryBuilderProps.value.searchInputsWithoutGlobal,
              forcedVisibleSearchInputs: forcedVisibleSearchInputs.value,
              onChange: changeSearchInputValue
            }, () => [
              queryBuilderProps.value.hasSearchInputsWithValue || forcedVisibleSearchInputs.value.length > 0 ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                "search-inputs": queryBuilderProps.value.searchInputsWithoutGlobal,
                "forced-visible-search-inputs": forcedVisibleSearchInputs.value,
                "on-change": changeSearchInputValue,
                "on-remove": disableSearchInput
              }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : createCommentVNode("", true)
            ]),
            renderSlot(_ctx.$slots, "tableWrapper", { meta: unref(resourceMeta) }, () => [
              createVNode(TableWrapper, {
                class: normalizeClass({ "mt-3": !unref(hasOnlyData) })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "table", {}, () => [
                    createElementVNode("table", _hoisted_6, [
                      createElementVNode("thead", _hoisted_7, [
                        renderSlot(_ctx.$slots, "head", {
                          show,
                          sortBy,
                          header
                        }, () => [
                          createElementVNode("tr", _hoisted_8, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(queryBuilderProps.value.columns, (column) => {
                              return openBlock(), createBlock(_sfc_main$a, {
                                key: `table-${__props.name}-header-${column.key}`,
                                cell: header(column.key)
                              }, null, 8, ["cell"]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createElementVNode("tbody", _hoisted_9, [
                        renderSlot(_ctx.$slots, "body", { show }, () => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(resourceData), (item, key) => {
                            return openBlock(), createElementBlock("tr", {
                              key: `table-${__props.name}-row-${key}`,
                              class: normalizeClass(["", {
                                "bg-gray-50": __props.striped && key % 2,
                                "hover:bg-gray-100": __props.striped,
                                "hover:bg-gray-50": !__props.striped
                              }])
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(queryBuilderProps.value.columns, (column) => {
                                return withDirectives((openBlock(), createElementBlock("td", {
                                  key: `table-${__props.name}-row-${key}-column-${column.key}`,
                                  class: "text-sm py-4 px-6 text-gray-500 whitespace-nowrap"
                                }, [
                                  renderSlot(_ctx.$slots, `cell(${column.key})`, { item }, () => [
                                    createTextVNode(toDisplayString(item[column.key]), 1)
                                  ])
                                ])), [
                                  [vShow, show(column.key)]
                                ]);
                              }), 128))
                            ], 2);
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  renderSlot(_ctx.$slots, "pagination", {
                    onClick: visit,
                    hasData: unref(hasData),
                    meta: unref(resourceMeta),
                    perPageOptions: queryBuilderProps.value.perPageOptions,
                    onPerPageChange
                  }, () => [
                    createVNode(_sfc_main$8, {
                      "on-click": visit,
                      "has-data": unref(hasData),
                      meta: unref(resourceMeta),
                      "per-page-options": queryBuilderProps.value.perPageOptions,
                      "on-per-page-change": onPerPageChange
                    }, null, 8, ["has-data", "meta", "per-page-options"])
                  ])
                ]),
                _: 3
              }, 8, ["class"])
            ])
          ], 10, _hoisted_1))
        ]),
        _: 3
      });
    };
  }
};
export { _sfc_main$b as ButtonWithDropdown, _sfc_main$a as HeaderCell, _sfc_main$c as OnClickOutside, _sfc_main$8 as Pagination, _sfc_main as Table, _sfc_main$7 as TableAddSearchRow, _sfc_main$6 as TableColumns, _sfc_main$5 as TableFilter, _sfc_main$4 as TableGlobalSearch, _sfc_main$2 as TableReset, _sfc_main$3 as TableSearchRows, TableWrapper, getTranslations, setTranslation, setTranslations };
