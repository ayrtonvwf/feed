var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: !0 });
  },
  __copyProps = (to, from, except, desc) => {
    if ((from && typeof from == "object") || typeof from == "function")
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) &&
          key !== except &&
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, "default", { value: mod, enumerable: !0 })
        : target,
      mod
    )
  ),
  __toCommonJS = (mod) =>
    __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  publicPath: () => publicPath,
  routes: () => routes,
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
});
var import_node = require("@remix-run/node"),
  import_react = require("@remix-run/react"),
  import_isbot = __toESM(require("isbot")),
  import_server = require("react-dom/server"),
  import_stream = require("stream"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  ABORT_DELAY = 5e3;
function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return (0, import_isbot.default)(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}
function handleBotRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let didError = !1,
      { pipe, abort } = (0, import_server.renderToPipeableStream)(
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react.RemixServer,
          {
            context: remixContext,
            url: request.url,
          },
          void 0,
          !1,
          {
            fileName: "app/entry.server.tsx",
            lineNumber: 41,
            columnNumber: 7,
          },
          this
        ),
        {
          onAllReady() {
            let body = new import_stream.PassThrough();
            responseHeaders.set("Content-Type", "text/html"),
              resolve(
                new import_node.Response(body, {
                  headers: responseHeaders,
                  status: didError ? 500 : responseStatusCode,
                })
              ),
              pipe(body);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            (didError = !0), console.error(error);
          },
        }
      );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let didError = !1,
      { pipe, abort } = (0, import_server.renderToPipeableStream)(
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react.RemixServer,
          {
            context: remixContext,
            url: request.url,
          },
          void 0,
          !1,
          {
            fileName: "app/entry.server.tsx",
            lineNumber: 82,
            columnNumber: 7,
          },
          this
        ),
        {
          onShellReady() {
            let body = new import_stream.PassThrough();
            responseHeaders.set("Content-Type", "text/html"),
              resolve(
                new import_node.Response(body, {
                  headers: responseHeaders,
                  status: didError ? 500 : responseStatusCode,
                })
              ),
              pipe(body);
          },
          onShellError(err) {
            reject(err);
          },
          onError(error) {
            (didError = !0), console.error(error);
          },
        }
      );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  action: () => action,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta,
});
var import_node3 = require("@remix-run/node"),
  import_react3 = require("@remix-run/react"),
  import_remix_typedjson = require("remix-typedjson");

// app/services/prisma.server.ts
var import_edge = require("@prisma/client/edge"),
  DATABASE_URL =
    "prisma://aws-us-east-1.prisma-data.com/?api_key=AJunWDUXCpIwj3Q-Y2_MSmVEB7ubWdSIo9PK-aXRoF3lhSG82F606EoZ_NFmUrSt",
  prisma;
global.__db__ ||
  (global.__db__ = new import_edge.PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })),
  (prisma = global.__db__),
  prisma.$connect();

// app/services/session.server.ts
var import_node2 = require("@remix-run/node"),
  sessionStorage = (0, import_node2.createCookieSessionStorage)({
    cookie: {
      name: "_session",
      sameSite: "lax",
      path: "/",
      httpOnly: !0,
      secrets: ["s3cr3t"],
      secure: !1,
    },
  }),
  { getSession, commitSession, destroySession } = sessionStorage;

// app/components/block/spinner.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  Spinner = () =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "svg",
      {
        className: "-ml-1 mr-3 h-10 w-10 animate-spin text-sky-500",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "circle",
            {
              className: "opacity-25",
              cx: "12",
              cy: "12",
              r: "10",
              stroke: "currentColor",
              strokeWidth: "4",
            },
            void 0,
            !1,
            {
              fileName: "app/components/block/spinner.tsx",
              lineNumber: 8,
              columnNumber: 5,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "path",
            {
              className: "opacity-75",
              fill: "currentColor",
              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
            },
            void 0,
            !1,
            {
              fileName: "app/components/block/spinner.tsx",
              lineNumber: 16,
              columnNumber: 5,
            },
            this
          ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/components/block/spinner.tsx",
        lineNumber: 2,
        columnNumber: 3,
      },
      this
    );

// app/components/header/link.tsx
var import_react2 = require("@remix-run/react"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  MyNavLink = (props) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      import_react2.NavLink,
      {
        ...props,
        className: ({ isActive }) =>
          `p-2 ${isActive ? "font-bold" : null} ${props.className}`,
      },
      void 0,
      !1,
      {
        fileName: "app/components/header/link.tsx",
        lineNumber: 5,
        columnNumber: 5,
      },
      this
    );

// app/services/auth.server.ts
var import_remix_auth = require("remix-auth"),
  import_remix_auth_form = require("remix-auth-form");

// app/services/hash.server.ts
var import_bcryptjs = __toESM(require("bcryptjs")),
  hash = async ({ password }) =>
    await import_bcryptjs.default.hash(password, 10),
  verify = async ({ hash: hash2, password }) =>
    await import_bcryptjs.default.compare(password, hash2);

// app/services/auth.server.ts
var authenticator = new import_remix_auth.Authenticator(sessionStorage);
authenticator.use(
  new import_remix_auth_form.FormStrategy(async ({ form }) => {
    var _a, _b;
    let email = (_a = form.get("email")) == null ? void 0 : _a.toString();
    if (!email) throw "No e-mail provided";
    let password = (_b = form.get("password")) == null ? void 0 : _b.toString();
    if (!password) throw "No password provided";
    await prisma.$connect();
    let user = await prisma.user.findFirst({ where: { email } });
    if ((await prisma.$disconnect(), !user)) throw "User not found";
    if (!user.passwordHash) throw "No password defined";
    if (!(await verify({ password, hash: user.passwordHash })))
      throw "Invalid password";
    return user;
  }),
  "user-pass"
);

// app/styles/app.css
var app_default = "/build/_assets/app-MOENLDZA.css";

// app/root.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  links = () => [{ rel: "stylesheet", href: app_default }],
  meta = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  }),
  loader = async ({ request, context }) => {
    var _a, _b;
    let session = await getSession(request.headers.get("cookie")),
      user = await authenticator.isAuthenticated(request);
    if (!user)
      return (0, import_remix_typedjson.typedjson)({
        feeds: [],
        user,
        tenantId: null,
        tenants: [],
        tenantUser: null,
      });
    await prisma.$connect();
    let tenants = await prisma.tenant.findMany({
        where: {
          TenantUser: {
            some: {
              userId: user.id,
            },
          },
        },
      }),
      sessionTenantId =
        (_a = session.get("tenantId")) == null ? void 0 : _a.toString(),
      tenantId =
        sessionTenantId || ((_b = tenants[0]) == null ? void 0 : _b.id) || null,
      shouldSetTenantId = !sessionTenantId && tenantId;
    shouldSetTenantId && session.set("tenantId", tenantId);
    let [feeds, tenantUser] = tenantId
      ? await Promise.all([
          prisma.feed.findMany({ where: { tenantId } }),
          prisma.tenantUser.findFirst({ where: { tenantId, userId: user.id } }),
        ])
      : [[], null];
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson.typedjson)(
        { feeds, user, tenantId, tenants, tenantUser },
        shouldSetTenantId
          ? {
              headers: {
                "Set-Cookie": await commitSession(session),
              },
            }
          : void 0
      )
    );
  },
  action = async ({ request, context, params }) => {
    let body = await request.formData(),
      { _action, ...values } = Object.fromEntries(body);
    if (_action === "setTenant") {
      let session = await getSession(request.headers.get("cookie"));
      return (
        session.set("tenantId", values.id),
        (0, import_node3.redirect)("/", {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        })
      );
    }
  };
function App() {
  var _a;
  let transition = (0, import_react3.useTransition)(),
    { feeds, tenantId, user, tenants, tenantUser } = (0,
    import_remix_typedjson.useTypedLoaderData)(),
    submit = (0, import_react3.useSubmit)(),
    isAdminRoute =
      ((_a = (0, import_react3.useMatches)()[1]) == null ? void 0 : _a.id) ===
      "routes/admin",
    onChangeTenant = (event) => submit(event.currentTarget, { replace: !0 });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "html",
    {
      lang: "pt-BR",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "head",
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "title",
                {
                  children: "Feed",
                },
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 139,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react3.Meta,
                {},
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 140,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react3.Links,
                {},
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 141,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/root.tsx",
            lineNumber: 138,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "body",
          {
            className: "bg-slate-200",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "header",
                {
                  className: "sticky top-0 bg-white pt-2 shadow",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "div",
                    {
                      className: "container mx-auto",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "nav",
                          {
                            className: "flex flex-wrap items-center",
                            children: [
                              /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                MyNavLink,
                                {
                                  to: "/",
                                  children: "Home",
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/root.tsx",
                                  lineNumber: 147,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                MyNavLink,
                                {
                                  to: "/invite",
                                  children: "Meus Invites",
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/root.tsx",
                                  lineNumber: 148,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              ((user == null ? void 0 : user.type) ===
                                "SUPERADMIN" ||
                                (tenantUser == null
                                  ? void 0
                                  : tenantUser.type) === "MANAGER") &&
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  import_jsx_dev_runtime.Fragment,
                                  {
                                    children: [
                                      /* @__PURE__ */ (0,
                                      import_jsx_dev_runtime.jsxDEV)(
                                        MyNavLink,
                                        {
                                          to: "/feeds",
                                          children: "Feeds",
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/root.tsx",
                                          lineNumber: 152,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                      /* @__PURE__ */ (0,
                                      import_jsx_dev_runtime.jsxDEV)(
                                        MyNavLink,
                                        {
                                          to: "/invite/tenant",
                                          children: "Invites do Tenant",
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/root.tsx",
                                          lineNumber: 153,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                      /* @__PURE__ */ (0,
                                      import_jsx_dev_runtime.jsxDEV)(
                                        MyNavLink,
                                        {
                                          to: "/users",
                                          children: "Users",
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/root.tsx",
                                          lineNumber: 154,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  !0,
                                  {
                                    fileName: "app/root.tsx",
                                    lineNumber: 151,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                              (user == null ? void 0 : user.type) ===
                                "SUPERADMIN" &&
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  MyNavLink,
                                  {
                                    to: "/admin",
                                    children: "Admin",
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/root.tsx",
                                    lineNumber: 158,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                              user &&
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  import_jsx_dev_runtime.Fragment,
                                  {
                                    children: /* @__PURE__ */ (0,
                                    import_jsx_dev_runtime.jsxDEV)(
                                      "div",
                                      {
                                        className: "ml-auto",
                                        children: [
                                          /* @__PURE__ */ (0,
                                          import_jsx_dev_runtime.jsxDEV)(
                                            import_react3.Form,
                                            {
                                              onChange: onChangeTenant,
                                              method: "post",
                                              className: "inline",
                                              children: [
                                                /* @__PURE__ */ (0,
                                                import_jsx_dev_runtime.jsxDEV)(
                                                  "input",
                                                  {
                                                    type: "hidden",
                                                    name: "_action",
                                                    value: "setTenant",
                                                  },
                                                  void 0,
                                                  !1,
                                                  {
                                                    fileName: "app/root.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 23,
                                                  },
                                                  this
                                                ),
                                                /* @__PURE__ */ (0,
                                                import_jsx_dev_runtime.jsxDEV)(
                                                  "select",
                                                  {
                                                    name: "id",
                                                    defaultValue:
                                                      tenantId || void 0,
                                                    children: tenants.map(
                                                      (tenant) =>
                                                        /* @__PURE__ */ (0,
                                                        import_jsx_dev_runtime.jsxDEV)(
                                                          "option",
                                                          {
                                                            value: tenant.id,
                                                            children:
                                                              tenant.name,
                                                          },
                                                          tenant.id,
                                                          !1,
                                                          {
                                                            fileName:
                                                              "app/root.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 27,
                                                          },
                                                          this
                                                        )
                                                    ),
                                                  },
                                                  void 0,
                                                  !1,
                                                  {
                                                    fileName: "app/root.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 23,
                                                  },
                                                  this
                                                ),
                                              ],
                                            },
                                            void 0,
                                            !0,
                                            {
                                              fileName: "app/root.tsx",
                                              lineNumber: 163,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                          /* @__PURE__ */ (0,
                                          import_jsx_dev_runtime.jsxDEV)(
                                            MyNavLink,
                                            {
                                              to: `/user/${user.id}`,
                                              children: user.name,
                                            },
                                            void 0,
                                            !1,
                                            {
                                              fileName: "app/root.tsx",
                                              lineNumber: 177,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                          /* @__PURE__ */ (0,
                                          import_jsx_dev_runtime.jsxDEV)(
                                            MyNavLink,
                                            {
                                              to: "/logout",
                                              children: "Sair",
                                            },
                                            void 0,
                                            !1,
                                            {
                                              fileName: "app/root.tsx",
                                              lineNumber: 178,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      !0,
                                      {
                                        fileName: "app/root.tsx",
                                        lineNumber: 162,
                                        columnNumber: 19,
                                      },
                                      this
                                    ),
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/root.tsx",
                                    lineNumber: 161,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                              !user &&
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  import_jsx_dev_runtime.Fragment,
                                  {
                                    children: [
                                      /* @__PURE__ */ (0,
                                      import_jsx_dev_runtime.jsxDEV)(
                                        MyNavLink,
                                        {
                                          to: "/create-account",
                                          children: "Criar conta",
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/root.tsx",
                                          lineNumber: 184,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                      /* @__PURE__ */ (0,
                                      import_jsx_dev_runtime.jsxDEV)(
                                        MyNavLink,
                                        {
                                          to: "/login",
                                          children: "Entrar",
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/root.tsx",
                                          lineNumber: 185,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  !0,
                                  {
                                    fileName: "app/root.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                            ],
                          },
                          void 0,
                          !0,
                          {
                            fileName: "app/root.tsx",
                            lineNumber: 146,
                            columnNumber: 13,
                          },
                          this
                        ),
                        user &&
                          !isAdminRoute &&
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "ul",
                            {
                              className:
                                "flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500",
                              children: feeds.map((feed) =>
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  "li",
                                  {
                                    className: "mr-2",
                                    children: /* @__PURE__ */ (0,
                                    import_jsx_dev_runtime.jsxDEV)(
                                      MyNavLink,
                                      {
                                        to: `/feed/${feed.id}`,
                                        className:
                                          "inline-block rounded-t-lg bg-gray-100 px-4 py-2 text-blue-600",
                                        children: feed.title,
                                      },
                                      feed.id,
                                      !1,
                                      {
                                        fileName: "app/root.tsx",
                                        lineNumber: 193,
                                        columnNumber: 21,
                                      },
                                      this
                                    ),
                                  },
                                  feed.id,
                                  !1,
                                  {
                                    fileName: "app/root.tsx",
                                    lineNumber: 192,
                                    columnNumber: 19,
                                  },
                                  this
                                )
                              ),
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/root.tsx",
                              lineNumber: 190,
                              columnNumber: 15,
                            },
                            this
                          ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/root.tsx",
                      lineNumber: 145,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 144,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react3.Outlet,
                {},
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 206,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: `fixed inset-0 items-center justify-center bg-white/50 ${
                    transition.state === "idle" ? "hidden" : "flex"
                  }`,
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    Spinner,
                    {},
                    void 0,
                    !1,
                    {
                      fileName: "app/root.tsx",
                      lineNumber: 212,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 207,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react3.ScrollRestoration,
                {},
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 214,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react3.Scripts,
                {},
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 215,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react3.LiveReload,
                {},
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 216,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/root.tsx",
            lineNumber: 143,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/root.tsx",
      lineNumber: 137,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/invite/respond/$tenantInviteId.tsx
var tenantInviteId_exports = {};
__export(tenantInviteId_exports, {
  action: () => action2,
});
var import_remix_typedjson2 = require("remix-typedjson"),
  import_tiny_invariant = __toESM(require("tiny-invariant"));
var import_ulid = require("ulid"),
  action2 = async ({ request, context, params }) => {
    var _a;
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      response =
        ((_a = new URL(request.url).searchParams.get("response")) == null
          ? void 0
          : _a.toString()) || "";
    (0, import_tiny_invariant.default)(
      typeof params.tenantInviteId == "string",
      "params.tenantInviteId should be a string"
    ),
      (0, import_tiny_invariant.default)(
        ["accept", "decline"].includes(response),
        "searchParams.response should be either accept or decline"
      ),
      await prisma.$connect();
    let existingInvite = await prisma.tenantInvite.findFirst({
      where: { email: user.email, id: params.tenantInviteId },
      include: { Tenant: !0 },
    });
    if (!existingInvite || existingInvite.respondedAt)
      return (
        await prisma.$disconnect(), (0, import_remix_typedjson2.redirect)("/")
      );
    if (
      (await prisma.tenantUser.findFirst({
        where: {
          User: { email: user.email },
          tenantId: existingInvite.Tenant.id,
        },
      })) &&
      response === "accept"
    )
      throw (await prisma.$disconnect(), new Error("User already on tenant"));
    return (
      response === "accept" &&
        (await prisma.tenantUser.create({
          data: {
            id: (0, import_ulid.ulid)(),
            userId: user.id,
            tenantId: existingInvite.Tenant.id,
            type: "NORMAL",
          },
        })),
      await prisma.tenantInvite.update({
        data: {
          respondedAt: new Date(),
          response: response === "accept",
        },
        where: { id: existingInvite.id },
      }),
      await prisma.$disconnect(),
      (0, import_remix_typedjson2.redirect)("/invite")
    );
  };

// app/routes/create-account/index.tsx
var create_account_exports = {};
__export(create_account_exports, {
  action: () => action3,
  default: () => Index,
  loader: () => loader2,
  validator: () => validator,
});
var import_node4 = require("@remix-run/node"),
  import_with_zod = require("@remix-validated-form/with-zod"),
  import_remix_validated_form3 = require("remix-validated-form"),
  import_zod = require("zod");

// app/components/block/panel.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  Panel = (props) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        ...props,
        className:
          "my-5 flex flex-col gap-2 bg-white p-5 shadow rounded-md " +
          props.className,
        children: props.children,
      },
      void 0,
      !1,
      {
        fileName: "app/components/block/panel.tsx",
        lineNumber: 2,
        columnNumber: 3,
      },
      this
    );

// app/components/form/input.tsx
var import_remix_validated_form = require("remix-validated-form"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  MyInput = ({ name, label, type }) => {
    let { error, getInputProps } = (0, import_remix_validated_form.useField)(
      name
    );
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "label",
            {
              htmlFor: name,
              children: label,
            },
            void 0,
            !1,
            {
              fileName: "app/components/form/input.tsx",
              lineNumber: 18,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              ...getInputProps({ id: name, type }),
              className: "block w-full rounded-lg bg-gray-200 p-2",
            },
            void 0,
            !1,
            {
              fileName: "app/components/form/input.tsx",
              lineNumber: 19,
              columnNumber: 7,
            },
            this
          ),
          error &&
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "span",
              {
                className: "my-error-class",
                children: error,
              },
              void 0,
              !1,
              {
                fileName: "app/components/form/input.tsx",
                lineNumber: 23,
                columnNumber: 17,
              },
              this
            ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/components/form/input.tsx",
        lineNumber: 17,
        columnNumber: 5,
      },
      this
    );
  };

// app/components/form/submit-button.tsx
var import_remix_validated_form2 = require("remix-validated-form"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  MySubmitButton = ({ name, value, children }) => {
    let isSubmitting = (0, import_remix_validated_form2.useIsSubmitting)();
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white",
        name,
        value,
        children: children
          ? typeof children == "function"
            ? children({ isSubmitting })
            : children
          : isSubmitting
          ? "Submitting..."
          : "Submit",
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/submit-button.tsx",
        lineNumber: 22,
        columnNumber: 5,
      },
      this
    );
  };

// app/components/typography/title.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  MyH1 = ({ children }) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "h1",
      {
        className: "text-3xl font-bold text-slate-900",
        children,
      },
      void 0,
      !1,
      {
        fileName: "app/components/typography/title.tsx",
        lineNumber: 2,
        columnNumber: 3,
      },
      this
    ),
  MyH2 = ({ children }) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "h2",
      {
        className: "text-2xl font-bold text-slate-900",
        children,
      },
      void 0,
      !1,
      {
        fileName: "app/components/typography/title.tsx",
        lineNumber: 6,
        columnNumber: 3,
      },
      this
    ),
  MyH3 = ({ children }) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "h3",
      {
        className: "text-xl font-bold text-slate-900",
        children,
      },
      void 0,
      !1,
      {
        fileName: "app/components/typography/title.tsx",
        lineNumber: 10,
        columnNumber: 3,
      },
      this
    );

// app/routes/create-account/index.tsx
var import_ulid2 = require("ulid"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  validator = (0, import_with_zod.withZod)(
    import_zod.z.object({
      name: import_zod.z.string().min(5, { message: "Name is required" }),
      email: import_zod.z
        .string()
        .min(1, { message: "Email is required" })
        .email(),
      password: import_zod.z
        .string()
        .min(6, { message: "Password should have at least 6 characters" }),
    })
  ),
  loader2 = async ({ request, context }) =>
    await authenticator.isAuthenticated(request, {
      successRedirect: "/",
    }),
  action3 = async ({ request, context, params }) => {
    let validated = await validator.validate(await request.clone().formData());
    if (validated.error)
      return (0, import_remix_validated_form3.validationError)(
        validated.error,
        validated.data
      );
    if (
      (await prisma.$connect(),
      await prisma.user.findFirst({
        where: { email: validated.data.email },
      }))
    )
      throw (await prisma.$disconnect(), new Error("User already exists"));
    let user = await prisma.user.create({
        data: {
          id: (0, import_ulid2.ulid)(),
          name: validated.data.name,
          email: validated.data.email,
          passwordHash: await hash({ password: validated.data.password }),
        },
      }),
      tenant = await prisma.tenant.create({
        data: {
          id: (0, import_ulid2.ulid)(),
          name: `${user.name}'s Tenant`,
          TenantUser: {
            create: {
              id: (0, import_ulid2.ulid)(),
              userId: user.id,
              type: "MANAGER",
            },
          },
          Feed: {
            create: {
              id: (0, import_ulid2.ulid)(),
              title: "Default Feed",
              Post: {
                create: {
                  id: (0, import_ulid2.ulid)(),
                  title: `Welcome to ${user.name}'s Tenant`,
                  description:
                    "This is the first post of the whole Tenant. Feel free to explore! (automatically generated)",
                  userId: user.id,
                },
              },
            },
          },
        },
      });
    await prisma.$disconnect();
    let session = await getSession(request.headers.get("cookie"));
    return (
      session.set("tenantId", tenant.id),
      session.set(authenticator.sessionKey, user),
      (0, import_node4.redirect)("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      })
    );
  };
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children:
              "Crie aqui agora mesmo a sua nova conta para voc\xEA estar usando esse maravilhoso sistema de feed",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/create-account/index.tsx",
            lineNumber: 120,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_remix_validated_form3.ValidatedForm,
              {
                validator,
                method: "post",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "fieldset",
                  {
                    className: "flex flex-col gap-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyInput,
                        {
                          name: "name",
                          label: "Nome",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/create-account/index.tsx",
                          lineNumber: 127,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyInput,
                        {
                          name: "email",
                          label: "E-mail",
                          type: "email",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/create-account/index.tsx",
                          lineNumber: 128,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyInput,
                        {
                          name: "password",
                          label: "Senha",
                          type: "password",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/create-account/index.tsx",
                          lineNumber: 129,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MySubmitButton,
                        {},
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/create-account/index.tsx",
                          lineNumber: 130,
                          columnNumber: 13,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/create-account/index.tsx",
                    lineNumber: 126,
                    columnNumber: 11,
                  },
                  this
                ),
              },
              void 0,
              !1,
              {
                fileName: "app/routes/create-account/index.tsx",
                lineNumber: 125,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/create-account/index.tsx",
            lineNumber: 124,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/create-account/index.tsx",
      lineNumber: 119,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/users/$userId/remove.tsx
var remove_exports = {};
__export(remove_exports, {
  action: () => action4,
  default: () => UserTenantsModal,
  links: () => links2,
  loader: () => loader3,
});
var import_dialog = require("@reach/dialog");

// node_modules/@reach/dialog/styles.css
var styles_default = "/build/_assets/styles-MGWA7S4B.css";

// app/routes/users/$userId/remove.tsx
var import_react4 = require("@remix-run/react"),
  import_remix_typedjson3 = require("remix-typedjson"),
  import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  links2 = () => [
    {
      rel: "stylesheet",
      href: styles_default,
    },
  ],
  loader3 = async ({ request, context, params }) => {
    var _a;
    let currentUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant2.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      (0, import_tiny_invariant2.default)(
        typeof params.userId == "string",
        "params.userId should be a string"
      );
    let [user, currentTenantUser] = await Promise.all([
      prisma.user.findUnique({
        where: { id: params.userId },
        include: {
          TenantUser: { include: { Tenant: !0 }, where: { tenantId } },
        },
      }),
      prisma.tenantUser.findFirst({
        where: { tenantId, userId: currentUser.id },
      }),
    ]);
    if (
      !((_a = user == null ? void 0 : user.TenantUser) != null && _a.length) ||
      ((currentTenantUser == null ? void 0 : currentTenantUser.type) !==
        "MANAGER" &&
        currentUser.type !== "SUPERADMIN")
    )
      throw new Error("User not found");
    return (0, import_remix_typedjson3.typedjson)({ user });
  },
  action4 = async ({ request, context, params }) => {
    var _a;
    let currentUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant2.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      (0, import_tiny_invariant2.default)(
        typeof params.userId == "string",
        "params.userId should be a string"
      ),
      await prisma.$connect();
    let [user, currentTenantUser] = await Promise.all([
      prisma.user.findUnique({
        where: { id: params.userId },
        include: {
          TenantUser: { include: { Tenant: !0 }, where: { tenantId } },
        },
      }),
      prisma.tenantUser.findFirst({
        where: { tenantId, userId: currentUser.id },
      }),
    ]);
    if (
      !((_a = user == null ? void 0 : user.TenantUser) != null && _a.length) ||
      ((currentTenantUser == null ? void 0 : currentTenantUser.type) !==
        "MANAGER" &&
        currentUser.type !== "SUPERADMIN")
    )
      throw new Error("User not found");
    return (
      await prisma.tenantUser.delete({
        where: { id: user.TenantUser[0].id },
      }),
      await prisma.$disconnect(),
      (0, import_remix_typedjson3.redirect)("/users")
    );
  };
function UserTenantsModal() {
  let navigate = (0, import_react4.useNavigate)(),
    onDismiss = () => navigate("/users"),
    { user } = (0, import_remix_typedjson3.useTypedLoaderData)(),
    title = `Remove ${user.name} from tenant`;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    import_dialog.Dialog,
    {
      className: "dialog",
      isOpen: !0,
      "aria-label": title,
      onDismiss,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH3,
          {
            children: title,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/users/$userId/remove.tsx",
            lineNumber: 118,
            columnNumber: 7,
          },
          this
        ),
        "Are you sure you want to remove the user ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "b",
          {
            children: user.email,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/users/$userId/remove.tsx",
            lineNumber: 119,
            columnNumber: 48,
          },
          this
        ),
        " from the tenant?",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react4.Form,
          {
            method: "post",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "button",
              {
                type: "submit",
                children: "Yes, remove them",
              },
              void 0,
              !1,
              {
                fileName: "app/routes/users/$userId/remove.tsx",
                lineNumber: 122,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/users/$userId/remove.tsx",
            lineNumber: 121,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/users/$userId/remove.tsx",
      lineNumber: 112,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/invite/tenant.tsx
var tenant_exports = {};
__export(tenant_exports, {
  default: () => Index2,
  loader: () => loader4,
});
var import_react6 = require("@remix-run/react"),
  import_remix_typedjson4 = require("remix-typedjson"),
  import_tiny_invariant3 = __toESM(require("tiny-invariant"));

// app/helpers/date.ts
var import_luxon = require("luxon"),
  relative = (date) => import_luxon.DateTime.fromJSDate(date).toRelative();

// app/components/typography/date-time.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  DateTime2 = ({ children }) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "time",
      {
        dateTime: children.toISOString(),
        title: children.toString(),
        children: relative(children),
      },
      void 0,
      !1,
      {
        fileName: "app/components/typography/date-time.tsx",
        lineNumber: 3,
        columnNumber: 3,
      },
      this
    );

// app/components/typography/link.tsx
var import_react5 = require("@remix-run/react"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  MyLink = (props) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      import_react5.Link,
      {
        ...props,
        className: `text-sky-500 ${props.className}`,
        children: props.children,
      },
      void 0,
      !1,
      {
        fileName: "app/components/typography/link.tsx",
        lineNumber: 4,
        columnNumber: 3,
      },
      this
    );

// app/routes/invite/tenant.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader4 = async ({ request, context }) => {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant3.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      await prisma.$connect();
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
    });
    if (
      user.type !== "SUPERADMIN" &&
      (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER"
    )
      return (
        await prisma.$disconnect(), (0, import_remix_typedjson4.redirect)("/")
      );
    let tenantInvites = await prisma.tenantInvite.findMany({
      where: { tenantId },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson4.typedjson)({ tenantInvites })
    );
  };
function Index2() {
  let { tenantInvites } = (0, import_remix_typedjson4.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children: "Invites",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant.tsx",
            lineNumber: 62,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              MyLink,
              {
                to: "/invite/tenant/create",
                className:
                  "ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white",
                children: "Criar invite",
              },
              void 0,
              !1,
              {
                fileName: "app/routes/invite/tenant.tsx",
                lineNumber: 64,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant.tsx",
            lineNumber: 63,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "ul",
              {
                children: tenantInvites.map((tenantInvite) =>
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "li",
                    {
                      children: [
                        tenantInvite.email,
                        " -",
                        " ",
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          DateTime2,
                          {
                            children: tenantInvite.createdAt,
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/invite/tenant.tsx",
                            lineNumber: 76,
                            columnNumber: 15,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MyLink,
                          {
                            to: `/invite/tenant/delete/${tenantInvite.id}`,
                            children: "Delete",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/invite/tenant.tsx",
                            lineNumber: 77,
                            columnNumber: 15,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/invite/tenant.tsx",
                      lineNumber: 74,
                      columnNumber: 13,
                    },
                    this
                  )
                ),
              },
              void 0,
              !1,
              {
                fileName: "app/routes/invite/tenant.tsx",
                lineNumber: 72,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant.tsx",
            lineNumber: 71,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react6.Outlet,
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant.tsx",
            lineNumber: 84,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/invite/tenant.tsx",
      lineNumber: 61,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/invite/tenant/delete/$tenantInviteId.tsx
var tenantInviteId_exports2 = {};
__export(tenantInviteId_exports2, {
  action: () => action5,
  default: () => DeleteTenantInviteModal,
  links: () => links3,
  loader: () => loader5,
});
var import_dialog2 = require("@reach/dialog");
var import_react7 = require("@remix-run/react"),
  import_remix_typedjson5 = require("remix-typedjson"),
  import_tiny_invariant4 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  links3 = () => [
    {
      rel: "stylesheet",
      href: styles_default,
    },
  ],
  loader5 = async ({ request, context, params }) => {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant4.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      (0, import_tiny_invariant4.default)(
        typeof params.tenantInviteId == "string",
        "params.tenantInviteId should be a string"
      ),
      await prisma.$connect();
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
    });
    if (
      user.type !== "SUPERADMIN" &&
      (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER"
    )
      return (
        await prisma.$disconnect(), (0, import_remix_typedjson5.redirect)("/")
      );
    let tenantInvite = await prisma.tenantInvite.findFirst({
      where: { tenantId, id: params.tenantInviteId },
    });
    return tenantInvite
      ? tenantInvite.respondedAt
        ? (await prisma.$disconnect(),
          (0, import_remix_typedjson5.redirect)("/invite/tenant"))
        : (0, import_remix_typedjson5.typedjson)({ tenantInvite })
      : (await prisma.$disconnect(),
        (0, import_remix_typedjson5.redirect)("/"));
  },
  action5 = async ({ request, context, params }) => {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant4.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      (0, import_tiny_invariant4.default)(
        typeof params.tenantInviteId == "string",
        "params.tenantInviteId should be a string"
      ),
      await prisma.$connect();
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
    });
    if (
      user.type !== "SUPERADMIN" &&
      (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER"
    )
      return (
        await prisma.$disconnect(), (0, import_remix_typedjson5.redirect)("/")
      );
    let tenantInvite = await prisma.tenantInvite.findFirst({
      where: { tenantId, id: params.tenantInviteId },
    });
    return tenantInvite
      ? tenantInvite.respondedAt
        ? (await prisma.$disconnect(),
          (0, import_remix_typedjson5.redirect)("/invite/tenant"))
        : (await prisma.tenantInvite.delete({
            where: { id: params.tenantInviteId },
          }),
          await prisma.$disconnect(),
          (0, import_remix_typedjson5.redirect)("/invite/tenant"))
      : (await prisma.$disconnect(),
        (0, import_remix_typedjson5.redirect)("/"));
  };
function DeleteTenantInviteModal() {
  let { tenantInvite } = (0, import_remix_typedjson5.useTypedLoaderData)(),
    navigate = (0, import_react7.useNavigate)(),
    onDismiss = () => navigate("/invite/tenant"),
    title = "Delete invite for tenant";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    import_dialog2.Dialog,
    {
      className: "dialog",
      isOpen: !0,
      "aria-label": title,
      onDismiss,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH3,
          {
            children: title,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant/delete/$tenantInviteId.tsx",
            lineNumber: 137,
            columnNumber: 7,
          },
          this
        ),
        "Are you sure you want to remove the invite for ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "b",
          {
            children: tenantInvite.email,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant/delete/$tenantInviteId.tsx",
            lineNumber: 138,
            columnNumber: 54,
          },
          this
        ),
        " ",
        "from the tenant?",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react7.Form,
          {
            method: "post",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "button",
              {
                type: "submit",
                children: "Yes, remove",
              },
              void 0,
              !1,
              {
                fileName: "app/routes/invite/tenant/delete/$tenantInviteId.tsx",
                lineNumber: 143,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant/delete/$tenantInviteId.tsx",
            lineNumber: 142,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/invite/tenant/delete/$tenantInviteId.tsx",
      lineNumber: 131,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/invite/tenant/create.tsx
var create_exports = {};
__export(create_exports, {
  action: () => action6,
  default: () => CreateTenantInviteModal,
  links: () => links4,
  validator: () => validator2,
});
var import_dialog3 = require("@reach/dialog");
var import_node5 = require("@remix-run/node"),
  import_react8 = require("@remix-run/react"),
  import_with_zod2 = require("@remix-validated-form/with-zod"),
  import_remix_validated_form4 = require("remix-validated-form"),
  import_tiny_invariant5 = __toESM(require("tiny-invariant")),
  import_zod2 = require("zod");
var import_ulid3 = require("ulid"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  validator2 = (0, import_with_zod2.withZod)(
    import_zod2.z.object({
      email: import_zod2.z
        .string()
        .min(1, { message: "Email is required" })
        .email(),
    })
  ),
  links4 = () => [
    {
      rel: "stylesheet",
      href: styles_default,
    },
  ],
  action6 = async ({ request, context, params }) => {
    let validated = await validator2.validate(await request.clone().formData());
    if (validated.error)
      return (0, import_remix_validated_form4.validationError)(
        validated.error,
        validated.data
      );
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant5.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      await prisma.$connect();
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
    });
    if (
      user.type !== "SUPERADMIN" &&
      (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER"
    )
      return await prisma.$disconnect(), (0, import_node5.redirect)("/");
    await prisma.$connect();
    let [existingInvite, existingTenantUser] = await Promise.all([
      prisma.tenantInvite.findFirst({
        where: { email: validated.data.email, tenantId },
      }),
      prisma.tenantUser.findFirst({
        where: { User: { email: validated.data.email }, tenantId },
      }),
    ]);
    if (existingInvite && !existingInvite.respondedAt)
      throw (await prisma.$disconnect(), new Error("Invite already exists"));
    if (existingTenantUser)
      throw (await prisma.$disconnect(), new Error("User already on tenant"));
    return (
      existingInvite &&
        (await prisma.tenantInvite.delete({
          where: { id: existingInvite.id },
        })),
      await prisma.tenantInvite.create({
        data: {
          id: (0, import_ulid3.ulid)(),
          email: validated.data.email,
          tenantId,
          invitedByUserId: user.id,
        },
      }),
      await prisma.$disconnect(),
      (0, import_node5.redirect)("/invite/tenant")
    );
  };
function CreateTenantInviteModal() {
  let navigate = (0, import_react8.useNavigate)(),
    onDismiss = () => navigate("/invite/tenant"),
    title = "Create invite for tenant";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    import_dialog3.Dialog,
    {
      className: "dialog",
      isOpen: !0,
      "aria-label": title,
      onDismiss,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH3,
          {
            children: title,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/tenant/create.tsx",
            lineNumber: 123,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_remix_validated_form4.ValidatedForm,
          {
            validator: validator2,
            method: "post",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyInput,
                {
                  name: "email",
                  label: "E-mail",
                  type: "email",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/invite/tenant/create.tsx",
                  lineNumber: 125,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MySubmitButton,
                {},
                void 0,
                !1,
                {
                  fileName: "app/routes/invite/tenant/create.tsx",
                  lineNumber: 126,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/invite/tenant/create.tsx",
            lineNumber: 124,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/invite/tenant/create.tsx",
      lineNumber: 117,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/feed/$feedId.tsx
var feedId_exports = {};
__export(feedId_exports, {
  default: () => feedId_default,
  loader: () => loader6,
});
var import_react10 = require("react"),
  import_react_intersection_observer = require("react-intersection-observer"),
  import_remix_typedjson9 = require("remix-typedjson"),
  import_remix_validated_form7 = require("remix-validated-form"),
  import_tiny_invariant8 = __toESM(require("tiny-invariant"));

// app/components/feed/feed-post.tsx
var import_react9 = require("react"),
  import_remix_typedjson7 = require("remix-typedjson"),
  import_remix_validated_form6 = require("remix-validated-form");

// app/routes/post/$postId/create-comment.tsx
var create_comment_exports = {};
__export(create_comment_exports, {
  action: () => action7,
  commentValidator: () => commentValidator,
});
var import_with_zod3 = require("@remix-validated-form/with-zod"),
  import_remix_typedjson6 = require("remix-typedjson"),
  import_tiny_invariant6 = __toESM(require("tiny-invariant")),
  import_zod3 = require("zod");
var import_ulid4 = require("ulid"),
  commentValidator = (0, import_with_zod3.withZod)(
    import_zod3.z.object({
      description: import_zod3.z
        .string()
        .min(5, { message: "Description is required" }),
    })
  ),
  action7 = async ({ request, context, params }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    if (
      ((0, import_tiny_invariant6.default)(
        typeof params.postId == "string",
        "params.postId should be a string"
      ),
      (await commentValidator.validate(await request.clone().formData())).error)
    )
      throw new Error("Validation error");
    let body = await request.formData(),
      data = Object.fromEntries(body);
    (0, import_tiny_invariant6.default)(
      typeof data.description == "string",
      "data.description is required"
    ),
      await prisma.$connect();
    let createdComment = await prisma.comment.create({
      data: {
        id: (0, import_ulid4.ulid)(),
        description: data.description,
        postId: params.postId,
        userId: user.id,
      },
      include: {
        User: !0,
      },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson6.typedjson)(
        { createdComment },
        { status: 201 }
      )
    );
  };

// app/routes/post/$postId/post-utils.ts
var post_utils_exports = {};
__export(post_utils_exports, {
  mergeComments: () => mergeComments,
});
var mergeComments = (comments, newComments, removeIds) =>
  [...comments, ...newComments]
    .sort((a, b) => a.id.localeCompare(b.id))
    .reduce(
      (acc, cur) =>
        acc.length
          ? acc[acc.length - 1].id === cur.id ||
            (removeIds == null ? void 0 : removeIds.includes(cur.id))
            ? acc
            : [...acc, cur]
          : [cur],
      []
    );

// app/components/form/textarea.tsx
var import_remix_validated_form5 = require("remix-validated-form"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  MyTextarea = ({ name, label }) => {
    let { error, getInputProps } = (0, import_remix_validated_form5.useField)(
      name
    );
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "label",
            {
              htmlFor: name,
              children: label,
            },
            void 0,
            !1,
            {
              fileName: "app/components/form/textarea.tsx",
              lineNumber: 16,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "textarea",
            {
              ...getInputProps({ id: name }),
              className: "block w-full rounded-lg bg-gray-200 p-2",
            },
            void 0,
            !1,
            {
              fileName: "app/components/form/textarea.tsx",
              lineNumber: 17,
              columnNumber: 7,
            },
            this
          ),
          error &&
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "span",
              {
                className: "my-error-class",
                children: error,
              },
              void 0,
              !1,
              {
                fileName: "app/components/form/textarea.tsx",
                lineNumber: 21,
                columnNumber: 17,
              },
              this
            ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/components/form/textarea.tsx",
        lineNumber: 15,
        columnNumber: 5,
      },
      this
    );
  };

// app/components/feed/feed-post.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  descriptionLimit = 100,
  propsDataToPostState = (propsData) => {
    var _a;
    return {
      data: propsData.post,
      createdComments: [],
      loadedComments: propsData.post.Comment,
      thirdPartyComments: propsData.post.Comment,
      lastLoadedCommentId:
        ((_a = propsData.post.Comment[propsData.post.Comment.length - 1]) ==
        null
          ? void 0
          : _a.id) || null,
      lastCommentIdToLoad: null,
    };
  },
  FeedPost = (props) => {
    let [post, setPost] = (0, import_react9.useState)(
        propsDataToPostState(props)
      ),
      [shouldFetchMore, setShouldFetchMore] = (0, import_react9.useState)(
        !post.lastCommentIdToLoad ||
          post.lastCommentIdToLoad !== post.lastLoadedCommentId
      ),
      moreComments = (0, import_remix_typedjson7.useTypedFetcher)();
    (0, import_react9.useEffect)(() => {
      var _a;
      if (!moreComments.data) return;
      let loadedComments = mergeComments(
          post.loadedComments,
          moreComments.data.post.Comment
        ),
        thirdPartyComments = mergeComments(
          post.thirdPartyComments,
          moreComments.data.post.Comment,
          post.createdComments.map((c) => c.id)
        ),
        lastLoadedCommentId =
          ((_a = loadedComments[loadedComments.length - 1]) == null
            ? void 0
            : _a.id) || null;
      setPost({
        ...post,
        loadedComments,
        thirdPartyComments,
        lastLoadedCommentId,
        lastCommentIdToLoad: moreComments.data.lastCommentId,
      }),
        setShouldFetchMore(
          !!moreComments.data.lastCommentId &&
            moreComments.data.lastCommentId !== lastLoadedCommentId
        );
    }, [moreComments.data]);
    let commentSubmiter = (0, import_remix_typedjson7.useTypedFetcher)();
    return (
      (0, import_react9.useEffect)(() => {
        !(commentSubmiter != null && commentSubmiter.data) ||
          (setPost({
            ...post,
            createdComments: mergeComments(post.createdComments, [
              commentSubmiter.data.createdComment,
            ]),
            lastCommentIdToLoad: commentSubmiter.data.createdComment.id,
          }),
          setShouldFetchMore(!0));
      }, [commentSubmiter.data]),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Panel,
        {
          className: "border-[1px] border-solid border-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "div",
                  {
                    className: "flex gap-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        "div",
                        {
                          children: /* @__PURE__ */ (0,
                          import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/user/${post.data.User.id}`,
                              children: post.data.User.name,
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/feed/feed-post.tsx",
                              lineNumber: 109,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/feed/feed-post.tsx",
                          lineNumber: 108,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        "div",
                        {
                          children: "|",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/feed/feed-post.tsx",
                          lineNumber: 113,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        DateTime2,
                        {
                          children: post.data.createdAt,
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/feed/feed-post.tsx",
                          lineNumber: 114,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyLink,
                        {
                          to: `/post/${post.data.id}`,
                          children: "#ref",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/feed/feed-post.tsx",
                          lineNumber: 115,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/components/feed/feed-post.tsx",
                    lineNumber: 107,
                    columnNumber: 9,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "hr",
                  {
                    className: "my-2",
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/feed-post.tsx",
                    lineNumber: 117,
                    columnNumber: 9,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "h3",
                  {
                    className: "font-bold",
                    children: post.data.title,
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/feed-post.tsx",
                    lineNumber: 118,
                    columnNumber: 9,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "p",
                  {
                    children:
                      post.data.description.substring(0, descriptionLimit) +
                      (post.data.description.length > descriptionLimit
                        ? "\u2026"
                        : ""),
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/feed-post.tsx",
                    lineNumber: 119,
                    columnNumber: 9,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "hr",
                  {},
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/feed-post.tsx",
                    lineNumber: 123,
                    columnNumber: 9,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "div",
                  {
                    className: "flex flex-col gap-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        import_remix_validated_form6.ValidatedForm,
                        {
                          resetAfterSubmit: !0,
                          validator: commentValidator,
                          className: "flex flex-col gap-2",
                          method: "post",
                          action: `/post/${post.data.id}/create-comment`,
                          fetcher: commentSubmiter,
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              MyTextarea,
                              {
                                name: "description",
                                label: "Coment\xE1rio",
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/feed/feed-post.tsx",
                                lineNumber: 133,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              MySubmitButton,
                              {},
                              void 0,
                              !1,
                              {
                                fileName: "app/components/feed/feed-post.tsx",
                                lineNumber: 134,
                                columnNumber: 13,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        !0,
                        {
                          fileName: "app/components/feed/feed-post.tsx",
                          lineNumber: 125,
                          columnNumber: 11,
                        },
                        this
                      ),
                      post.createdComments.map((comment) =>
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "div",
                          {
                            className: "flex flex-col gap-2",
                            children: [
                              /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "div",
                                {
                                  children: [
                                    /* @__PURE__ */ (0,
                                    import_jsx_dev_runtime.jsxDEV)(
                                      MyLink,
                                      {
                                        to: `/user/${comment.User.id}`,
                                        children: comment.User.name,
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName:
                                          "app/components/feed/feed-post.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    /* @__PURE__ */ (0,
                                    import_jsx_dev_runtime.jsxDEV)(
                                      "span",
                                      {
                                        children:
                                          comment.createdAt.toLocaleString(),
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName:
                                          "app/components/feed/feed-post.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                !0,
                                {
                                  fileName: "app/components/feed/feed-post.tsx",
                                  lineNumber: 138,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "p",
                                {
                                  children: /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    "b",
                                    {
                                      children: comment.description,
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName:
                                        "app/components/feed/feed-post.tsx",
                                      lineNumber: 145,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/feed/feed-post.tsx",
                                  lineNumber: 144,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          comment.id,
                          !0,
                          {
                            fileName: "app/components/feed/feed-post.tsx",
                            lineNumber: 137,
                            columnNumber: 13,
                          },
                          this
                        )
                      ),
                      post.thirdPartyComments.map((comment) =>
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "div",
                          {
                            className: "flex flex-col gap-2",
                            children: [
                              /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "div",
                                {
                                  children: [
                                    /* @__PURE__ */ (0,
                                    import_jsx_dev_runtime.jsxDEV)(
                                      MyLink,
                                      {
                                        to: `/user/${comment.User.id}`,
                                        children: comment.User.name,
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName:
                                          "app/components/feed/feed-post.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    /* @__PURE__ */ (0,
                                    import_jsx_dev_runtime.jsxDEV)(
                                      "span",
                                      {
                                        children:
                                          comment.createdAt.toLocaleString(),
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName:
                                          "app/components/feed/feed-post.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                !0,
                                {
                                  fileName: "app/components/feed/feed-post.tsx",
                                  lineNumber: 151,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "p",
                                {
                                  children: comment.description,
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/feed/feed-post.tsx",
                                  lineNumber: 157,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          comment.id,
                          !0,
                          {
                            fileName: "app/components/feed/feed-post.tsx",
                            lineNumber: 150,
                            columnNumber: 13,
                          },
                          this
                        )
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        "div",
                        {
                          className: "flex justify-center items-center py-10",
                          children: shouldFetchMore
                            ? /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "button",
                                {
                                  className:
                                    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                                  onClick: () => {
                                    moreComments.state === "idle" &&
                                      moreComments.submit(
                                        post.lastLoadedCommentId
                                          ? { after: post.lastLoadedCommentId }
                                          : null,
                                        {
                                          method: "get",
                                          action: `/post/${post.data.id}/load-comments`,
                                        }
                                      );
                                  },
                                  children:
                                    moreComments.state !== "idle"
                                      ? "Carregando coment\xE1rios..."
                                      : "Carregar mais coment\xE1rios",
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/feed/feed-post.tsx",
                                  lineNumber: 162,
                                  columnNumber: 15,
                                },
                                this
                              )
                            : /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "p",
                                {
                                  children:
                                    "N\xE3o h\xE1 mais coment\xE1rios para carregar.",
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/feed/feed-post.tsx",
                                  lineNumber: 184,
                                  columnNumber: 15,
                                },
                                this
                              ),
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/feed/feed-post.tsx",
                          lineNumber: 160,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/components/feed/feed-post.tsx",
                    lineNumber: 124,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            !0,
            {
              fileName: "app/components/feed/feed-post.tsx",
              lineNumber: 106,
              columnNumber: 7,
            },
            this
          ),
        },
        post.data.id,
        !1,
        {
          fileName: "app/components/feed/feed-post.tsx",
          lineNumber: 102,
          columnNumber: 5,
        },
        this
      )
    );
  };

// app/routes/feed/$feedId/create-post.tsx
var create_post_exports = {};
__export(create_post_exports, {
  action: () => action8,
  postValidator: () => postValidator,
});
var import_with_zod4 = require("@remix-validated-form/with-zod"),
  import_remix_typedjson8 = require("remix-typedjson"),
  import_tiny_invariant7 = __toESM(require("tiny-invariant")),
  import_zod4 = require("zod");
var import_ulid5 = require("ulid"),
  postValidator = (0, import_with_zod4.withZod)(
    import_zod4.z.object({
      title: import_zod4.z.string().min(5, { message: "Title is required" }),
      description: import_zod4.z
        .string()
        .min(5, { message: "Description is required" }),
    })
  ),
  action8 = async ({ request, context, params }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    (0, import_tiny_invariant7.default)(
      typeof params.feedId == "string",
      "params.feedId should be a string"
    );
    let validated = await postValidator.validate(
      await request.clone().formData()
    );
    if (validated.error) throw new Error("Validation error");
    await prisma.$connect();
    let createdPost = await prisma.post.create({
      data: {
        id: (0, import_ulid5.ulid)(),
        title: validated.data.title,
        description: validated.data.description,
        feedId: params.feedId,
        userId: user.id,
      },
      include: {
        User: !0,
        Feed: !0,
        Comment: { take: 3, include: { User: !0 }, orderBy: { id: "asc" } },
        _count: { select: { Comment: !0 } },
      },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson8.typedjson)({ createdPost }, { status: 201 })
    );
  };

// app/routes/feed/$feedId.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader6 = async ({ request, context, params }) => {
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    }),
      (0, import_tiny_invariant8.default)(
        typeof params.feedId == "string",
        "params.feedId should be a string"
      ),
      await prisma.$connect();
    let feed = await prisma.feed.findUnique({
      where: { id: params.feedId },
      include: {
        Post: {
          take: 2,
          include: {
            User: !0,
            Feed: !0,
            Comment: { take: 3, include: { User: !0 }, orderBy: { id: "asc" } },
            _count: { select: { Comment: !0 } },
          },
          orderBy: { id: "desc" },
        },
      },
    });
    if ((await prisma.$disconnect(), !feed)) throw new Error("Feed not found");
    return (0, import_remix_typedjson9.typedjson)({ feed });
  };
function feedId_default() {
  let { feed: initialFeed } = (0, import_remix_typedjson9.useTypedLoaderData)(),
    [feed, setFeed] = (0, import_react10.useState)(initialFeed),
    [shouldFetchMore, setShouldFetchMore] = (0, import_react10.useState)(
      feed.Post.length > 0
    ),
    morePosts = (0, import_remix_typedjson9.useTypedFetcher)();
  (0, import_react10.useEffect)(() => {
    !morePosts.data ||
      (setFeed({
        ...feed,
        Post: [...feed.Post, ...morePosts.data.feed.Post],
      }),
      setShouldFetchMore(morePosts.data.feed.Post.length > 0));
  }, [morePosts.data]);
  let endOfFeedInView = (0, import_react_intersection_observer.useInView)();
  (0, import_react10.useEffect)(() => {
    !endOfFeedInView.inView ||
      !shouldFetchMore ||
      morePosts.submit(
        { after: feed.Post[feed.Post.length - 1].id },
        { method: "get", action: `/feed/${feed.id}/load-posts` }
      );
  }, [endOfFeedInView.inView]),
    (0, import_react10.useEffect)(() => {
      (feed == null ? void 0 : feed.id) !==
        (initialFeed == null ? void 0 : initialFeed.id) && setFeed(initialFeed);
    }, [initialFeed]);
  let postSubmitter = (0, import_remix_typedjson9.useTypedFetcher)();
  return (
    (0, import_react10.useEffect)(() => {
      !(postSubmitter != null && postSubmitter.data) ||
        (setFeed({
          ...feed,
          Post: [postSubmitter.data.createdPost, ...feed.Post],
        }),
        setShouldFetchMore(!0));
    }, [postSubmitter.data]),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "main",
      {
        className: "container mx-auto max-w-4xl",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            MyH1,
            {
              children: feed.title,
            },
            void 0,
            !1,
            {
              fileName: "app/routes/feed/$feedId.tsx",
              lineNumber: 117,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Panel,
            {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_remix_validated_form7.ValidatedForm,
                {
                  resetAfterSubmit: !0,
                  validator: postValidator,
                  method: "post",
                  action: `/feed/${feed.id}/create-post`,
                  fetcher: postSubmitter,
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "fieldset",
                    {
                      className: "flex flex-col gap-2",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MyH2,
                          {
                            children: "Novo post",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/feed/$feedId.tsx",
                            lineNumber: 127,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MyInput,
                          {
                            name: "title",
                            label: "T\xEDtulo",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/feed/$feedId.tsx",
                            lineNumber: 128,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MyTextarea,
                          {
                            name: "description",
                            label: "Descri\xE7\xE3o",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/feed/$feedId.tsx",
                            lineNumber: 129,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MySubmitButton,
                          {
                            name: "_action",
                            value: "post",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/feed/$feedId.tsx",
                            lineNumber: 130,
                            columnNumber: 13,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/feed/$feedId.tsx",
                      lineNumber: 126,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/feed/$feedId.tsx",
                  lineNumber: 119,
                  columnNumber: 9,
                },
                this
              ),
            },
            void 0,
            !1,
            {
              fileName: "app/routes/feed/$feedId.tsx",
              lineNumber: 118,
              columnNumber: 7,
            },
            this
          ),
          feed.Post.map((post) =>
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              FeedPost,
              {
                post,
              },
              post.id,
              !1,
              {
                fileName: "app/routes/feed/$feedId.tsx",
                lineNumber: 135,
                columnNumber: 9,
              },
              this
            )
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              ref: endOfFeedInView.ref,
              className: "flex justify-center items-center py-10",
              children: shouldFetchMore
                ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    Spinner,
                    {},
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/feed/$feedId.tsx",
                      lineNumber: 142,
                      columnNumber: 11,
                    },
                    this
                  )
                : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "p",
                    {
                      children: "N\xE3o h\xE1 mais posts para carregar.",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/feed/$feedId.tsx",
                      lineNumber: 144,
                      columnNumber: 11,
                    },
                    this
                  ),
            },
            void 0,
            !1,
            {
              fileName: "app/routes/feed/$feedId.tsx",
              lineNumber: 137,
              columnNumber: 7,
            },
            this
          ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/routes/feed/$feedId.tsx",
        lineNumber: 116,
        columnNumber: 5,
      },
      this
    )
  );
}

// app/routes/feed/$feedId/load-posts.tsx
var load_posts_exports = {};
__export(load_posts_exports, {
  loader: () => loader7,
});
var import_remix_typedjson10 = require("remix-typedjson"),
  import_tiny_invariant9 = __toESM(require("tiny-invariant"));
var loader7 = async ({ request, context, params }) => {
  var _a;
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  }),
    (0, import_tiny_invariant9.default)(
      typeof params.feedId == "string",
      "params.feedId should be a string"
    );
  let after =
    (_a = new URL(request.url).searchParams.get("after")) == null
      ? void 0
      : _a.toString();
  await prisma.$connect();
  let feed = await prisma.feed.findUnique({
    where: { id: params.feedId },
    include: {
      Post: {
        take: 2,
        skip: 1,
        cursor: {
          id: after,
        },
        include: {
          User: !0,
          Feed: !0,
          Comment: { include: { User: !0 }, orderBy: { id: "asc" } },
          _count: { select: { Comment: !0 } },
        },
        orderBy: { id: "desc" },
      },
    },
  });
  if ((await prisma.$disconnect(), !feed)) throw new Error("Feed not found");
  return (0, import_remix_typedjson10.typedjson)({ feed });
};

// app/routes/invite/index.tsx
var invite_exports = {};
__export(invite_exports, {
  default: () => Index3,
  loader: () => loader8,
});
var import_react11 = require("@remix-run/react"),
  import_remix_typedjson11 = require("remix-typedjson");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader8 = async ({ request, context }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    await prisma.$connect();
    let tenantInvites = await prisma.tenantInvite.findMany({
      where: { email: user.email, respondedAt: null },
      include: { Tenant: !0 },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson11.typedjson)({ tenantInvites })
    );
  };
function Index3() {
  let { tenantInvites } = (0, import_remix_typedjson11.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children: "Invites",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/index.tsx",
            lineNumber: 32,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "ul",
              {
                children: tenantInvites.map((tenantInvite) =>
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "li",
                    {
                      children: [
                        tenantInvite.Tenant.name,
                        " -",
                        " ",
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          DateTime2,
                          {
                            children: tenantInvite.createdAt,
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/invite/index.tsx",
                            lineNumber: 38,
                            columnNumber: 15,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          import_react11.Form,
                          {
                            method: "post",
                            action: `/invite/respond/${tenantInvite.id}?response=ignore`,
                            children: /* @__PURE__ */ (0,
                            import_jsx_dev_runtime.jsxDEV)(
                              "button",
                              {
                                type: "submit",
                                children: "Ignore",
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/invite/index.tsx",
                                lineNumber: 43,
                                columnNumber: 17,
                              },
                              this
                            ),
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/invite/index.tsx",
                            lineNumber: 39,
                            columnNumber: 15,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          import_react11.Form,
                          {
                            method: "post",
                            action: `/invite/respond/${tenantInvite.id}?response=accept`,
                            children: /* @__PURE__ */ (0,
                            import_jsx_dev_runtime.jsxDEV)(
                              "button",
                              {
                                type: "submit",
                                children: "Accept",
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/invite/index.tsx",
                                lineNumber: 49,
                                columnNumber: 17,
                              },
                              this
                            ),
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/invite/index.tsx",
                            lineNumber: 45,
                            columnNumber: 15,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/invite/index.tsx",
                      lineNumber: 36,
                      columnNumber: 13,
                    },
                    this
                  )
                ),
              },
              void 0,
              !1,
              {
                fileName: "app/routes/invite/index.tsx",
                lineNumber: 34,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/invite/index.tsx",
            lineNumber: 33,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react11.Outlet,
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/invite/index.tsx",
            lineNumber: 55,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/invite/index.tsx",
      lineNumber: 31,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/logout/index.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action9,
  default: () => Index4,
  loader: () => loader9,
});
var import_with_zod5 = require("@remix-validated-form/with-zod"),
  import_remix_validated_form8 = require("remix-validated-form"),
  import_zod5 = require("zod");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
async function loader9({ request }) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}
var action9 = async ({ request, context, params }) => {
    await authenticator.logout(request, { redirectTo: "/login" });
  },
  validator3 = (0, import_with_zod5.withZod)(import_zod5.z.object({}));
function Index4() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children: "Sair",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/logout/index.tsx",
            lineNumber: 34,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            className: "max-w-lg mx-auto",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyH2,
                {
                  children: "Deseja fazer logout?",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/logout/index.tsx",
                  lineNumber: 36,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_remix_validated_form8.ValidatedForm,
                {
                  method: "post",
                  validator: validator3,
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MySubmitButton,
                    {
                      children: ({ isSubmitting }) =>
                        isSubmitting ? "Saindo..." : "Sair",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/logout/index.tsx",
                      lineNumber: 38,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/logout/index.tsx",
                  lineNumber: 37,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/logout/index.tsx",
            lineNumber: 35,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/logout/index.tsx",
      lineNumber: 33,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/post/$postId.tsx
var postId_exports = {};
__export(postId_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => postId_default,
  loader: () => loader10,
});
var import_react12 = require("react"),
  import_react_intersection_observer2 = require("react-intersection-observer"),
  import_remix_typedjson12 = require("remix-typedjson"),
  import_remix_validated_form9 = require("remix-validated-form"),
  import_tiny_invariant10 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader10 = async ({ request, context, params }) => {
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    }),
      (0, import_tiny_invariant10.default)(
        params.postId,
        "params.postId is required"
      ),
      await prisma.$connect();
    let [post, lastComment] = await Promise.all([
      prisma.post.findUnique({
        where: { id: params.postId },
        include: {
          User: !0,
          Feed: !0,
          Comment: { take: 3, include: { User: !0 }, orderBy: { id: "asc" } },
          _count: { select: { Comment: !0 } },
        },
      }),
      prisma.comment.findFirst({
        where: { postId: params.postId },
        orderBy: { id: "desc" },
      }),
    ]);
    if (!post) throw new Error("Post not found");
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson12.typedjson)({
        post,
        lastCommentId: (lastComment == null ? void 0 : lastComment.id) || null,
      })
    );
  },
  ErrorBoundary = ({ error }) => (
    console.error(error),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "h2",
            {
              children: "Ah n\xE3o!",
            },
            void 0,
            !1,
            {
              fileName: "app/routes/post/$postId.tsx",
              lineNumber: 66,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "h3",
            {
              children: "Algo de errado n\xE3o est\xE1 certo",
            },
            void 0,
            !1,
            {
              fileName: "app/routes/post/$postId.tsx",
              lineNumber: 67,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              children: [error.name, " - ", error.message],
            },
            void 0,
            !0,
            {
              fileName: "app/routes/post/$postId.tsx",
              lineNumber: 68,
              columnNumber: 7,
            },
            this
          ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/routes/post/$postId.tsx",
        lineNumber: 65,
        columnNumber: 5,
      },
      this
    )
  ),
  loaderDataToPostState = (loaderData) => {
    var _a;
    return {
      data: loaderData.post,
      createdComments: [],
      loadedComments: loaderData.post.Comment,
      thirdPartyComments: loaderData.post.Comment,
      lastLoadedCommentId:
        ((_a = loaderData.post.Comment[loaderData.post.Comment.length - 1]) ==
        null
          ? void 0
          : _a.id) || null,
      lastCommentIdToLoad: loaderData.lastCommentId,
    };
  };
function postId_default() {
  let loaderData = (0, import_remix_typedjson12.useTypedLoaderData)(),
    [post, setPost] = (0, import_react12.useState)(
      loaderDataToPostState(loaderData)
    ),
    [shouldFetchMore, setShouldFetchMore] = (0, import_react12.useState)(
      post.lastCommentIdToLoad &&
        post.lastCommentIdToLoad !== post.lastLoadedCommentId
    ),
    moreComments = (0, import_remix_typedjson12.useTypedFetcher)();
  (0, import_react12.useEffect)(() => {
    var _a;
    if (!moreComments.data) return;
    let loadedComments = mergeComments(
        post.loadedComments,
        moreComments.data.post.Comment
      ),
      thirdPartyComments = mergeComments(
        post.thirdPartyComments,
        moreComments.data.post.Comment,
        post.createdComments.map((c) => c.id)
      ),
      lastLoadedCommentId =
        ((_a = loadedComments[loadedComments.length - 1]) == null
          ? void 0
          : _a.id) || null;
    setPost({
      ...post,
      loadedComments,
      thirdPartyComments,
      lastLoadedCommentId,
      lastCommentIdToLoad: moreComments.data.lastCommentId,
    }),
      setShouldFetchMore(
        moreComments.data.lastCommentId &&
          moreComments.data.lastCommentId !== lastLoadedCommentId
      );
  }, [moreComments.data]);
  let endOfCommentsInView = (0,
  import_react_intersection_observer2.useInView)();
  (0, import_react12.useEffect)(() => {
    !endOfCommentsInView.inView ||
      !shouldFetchMore ||
      moreComments.state !== "idle" ||
      moreComments.submit(
        post.lastLoadedCommentId ? { after: post.lastLoadedCommentId } : null,
        { method: "get", action: `/post/${post.data.id}/load-comments` }
      );
  }, [endOfCommentsInView.inView, moreComments.data, shouldFetchMore]),
    (0, import_react12.useEffect)(() => {
      (post == null ? void 0 : post.data.id) !==
        (loaderData == null ? void 0 : loaderData.post.id) &&
        setPost(loaderDataToPostState(loaderData));
    }, [loaderData]);
  let commentSubmiter = (0, import_remix_typedjson12.useTypedFetcher)();
  return (
    (0, import_react12.useEffect)(() => {
      !(commentSubmiter != null && commentSubmiter.data) ||
        (setPost({
          ...post,
          createdComments: mergeComments(post.createdComments, [
            commentSubmiter.data.createdComment,
          ]),
          lastCommentIdToLoad: commentSubmiter.data.createdComment.id,
        }),
        setShouldFetchMore(!0));
    }, [commentSubmiter.data]),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "main",
      {
        className: "container mx-auto",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            className: "border-[1px] border-solid border-gray-300",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        className: "flex gap-2",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "div",
                            {
                              children: [
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  MyLink,
                                  {
                                    to: `/user/${post.data.User.id}`,
                                    children: post.data.User.name,
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/routes/post/$postId.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                " ",
                                "postou em",
                                " ",
                                /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  MyLink,
                                  {
                                    to: `/feed/${post.data.Feed.id}`,
                                    children: post.data.Feed.title,
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/routes/post/$postId.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                              ],
                            },
                            void 0,
                            !0,
                            {
                              fileName: "app/routes/post/$postId.tsx",
                              lineNumber: 179,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "div",
                            {
                              children: "|",
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/post/$postId.tsx",
                              lineNumber: 188,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            DateTime2,
                            {
                              children: post.data.createdAt,
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/post/$postId.tsx",
                              lineNumber: 189,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/post/${post.data.id}`,
                              children: "#ref",
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/post/$postId.tsx",
                              lineNumber: 190,
                              columnNumber: 13,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/post/$postId.tsx",
                        lineNumber: 178,
                        columnNumber: 11,
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "hr",
                      {
                        className: "my-2",
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/post/$postId.tsx",
                        lineNumber: 192,
                        columnNumber: 11,
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "h3",
                      {
                        className: "font-bold",
                        children: post.data.title,
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/post/$postId.tsx",
                        lineNumber: 193,
                        columnNumber: 11,
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "p",
                      {
                        children: post.data.description,
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/post/$postId.tsx",
                        lineNumber: 194,
                        columnNumber: 11,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/post/$postId.tsx",
                  lineNumber: 177,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      import_remix_validated_form9.ValidatedForm,
                      {
                        resetAfterSubmit: !0,
                        validator: commentValidator,
                        className: "flex flex-col gap-2",
                        method: "post",
                        action: `/post/${post.data.id}/create-comment`,
                        fetcher: commentSubmiter,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyTextarea,
                            {
                              name: "description",
                              label: "Coment\xE1rio",
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/post/$postId.tsx",
                              lineNumber: 205,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MySubmitButton,
                            {},
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/post/$postId.tsx",
                              lineNumber: 206,
                              columnNumber: 13,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/post/$postId.tsx",
                        lineNumber: 197,
                        columnNumber: 11,
                      },
                      this
                    ),
                    post.createdComments.map((comment) =>
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        Panel,
                        {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              "div",
                              {
                                className: "flex",
                                children: [
                                  /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    MyLink,
                                    {
                                      to: `/user/${comment.User.id}`,
                                      children: comment.User.name,
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/routes/post/$postId.tsx",
                                      lineNumber: 211,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                  " ",
                                  /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    DateTime2,
                                    {
                                      children: comment.createdAt,
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/routes/post/$postId.tsx",
                                      lineNumber: 214,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                  /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    MyLink,
                                    {
                                      to: `/post/${post.data.id}?comment=${comment.id}`,
                                      children: "#ref",
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/routes/post/$postId.tsx",
                                      lineNumber: 215,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              {
                                fileName: "app/routes/post/$postId.tsx",
                                lineNumber: 210,
                                columnNumber: 15,
                              },
                              this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              "p",
                              {
                                children: /* @__PURE__ */ (0,
                                import_jsx_dev_runtime.jsxDEV)(
                                  "b",
                                  {
                                    children: comment.description,
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/routes/post/$postId.tsx",
                                    lineNumber: 220,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/post/$postId.tsx",
                                lineNumber: 219,
                                columnNumber: 15,
                              },
                              this
                            ),
                          ],
                        },
                        comment.id,
                        !0,
                        {
                          fileName: "app/routes/post/$postId.tsx",
                          lineNumber: 209,
                          columnNumber: 13,
                        },
                        this
                      )
                    ),
                    post.thirdPartyComments.map((comment) =>
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        Panel,
                        {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              "div",
                              {
                                className: "flex",
                                children: [
                                  /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    MyLink,
                                    {
                                      to: `/user/${comment.User.id}`,
                                      children: comment.User.name,
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/routes/post/$postId.tsx",
                                      lineNumber: 227,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                  " ",
                                  /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    DateTime2,
                                    {
                                      children: comment.createdAt,
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/routes/post/$postId.tsx",
                                      lineNumber: 230,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                  /* @__PURE__ */ (0,
                                  import_jsx_dev_runtime.jsxDEV)(
                                    MyLink,
                                    {
                                      to: `/post/${post.data.id}?comment=${comment.id}`,
                                      children: "#ref",
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/routes/post/$postId.tsx",
                                      lineNumber: 231,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              {
                                fileName: "app/routes/post/$postId.tsx",
                                lineNumber: 226,
                                columnNumber: 15,
                              },
                              this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              "p",
                              {
                                children: comment.description,
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/post/$postId.tsx",
                                lineNumber: 235,
                                columnNumber: 15,
                              },
                              this
                            ),
                          ],
                        },
                        comment.id,
                        !0,
                        {
                          fileName: "app/routes/post/$postId.tsx",
                          lineNumber: 225,
                          columnNumber: 13,
                        },
                        this
                      )
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        ref: endOfCommentsInView.ref,
                        className: "flex justify-center items-center py-10",
                        children: shouldFetchMore
                          ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              Spinner,
                              {},
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/post/$postId.tsx",
                                lineNumber: 243,
                                columnNumber: 15,
                              },
                              this
                            )
                          : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                              "p",
                              {
                                children:
                                  "N\xE3o h\xE1 mais coment\xE1rios para carregar.",
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/post/$postId.tsx",
                                lineNumber: 245,
                                columnNumber: 15,
                              },
                              this
                            ),
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/post/$postId.tsx",
                        lineNumber: 238,
                        columnNumber: 11,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/post/$postId.tsx",
                  lineNumber: 196,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          post.data.id,
          !0,
          {
            fileName: "app/routes/post/$postId.tsx",
            lineNumber: 173,
            columnNumber: 7,
          },
          this
        ),
      },
      void 0,
      !1,
      {
        fileName: "app/routes/post/$postId.tsx",
        lineNumber: 172,
        columnNumber: 5,
      },
      this
    )
  );
}

// app/routes/post/$postId/load-comments.tsx
var load_comments_exports = {};
__export(load_comments_exports, {
  loader: () => loader11,
});
var import_remix_typedjson13 = require("remix-typedjson"),
  import_tiny_invariant11 = __toESM(require("tiny-invariant"));
var loader11 = async ({ request, context, params }) => {
  var _a;
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  }),
    (0, import_tiny_invariant11.default)(
      typeof params.postId == "string",
      "params.postId should be a string"
    );
  let after =
    (_a = new URL(request.url).searchParams.get("after")) == null
      ? void 0
      : _a.toString();
  await prisma.$connect();
  let [post, lastComment] = await Promise.all([
    prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        User: !0,
        Feed: !0,
        Comment: {
          take: 3,
          skip: after ? 1 : 0,
          include: { User: !0 },
          cursor: after ? { id: after } : void 0,
          orderBy: { id: "asc" },
        },
      },
    }),
    prisma.comment.findFirst({
      where: { postId: params.postId },
      orderBy: { id: "desc" },
    }),
  ]);
  if ((await prisma.$disconnect(), !post)) throw new Error("Post not found");
  return (0, import_remix_typedjson13.typedjson)({
    post,
    lastCommentId: (lastComment == null ? void 0 : lastComment.id) || null,
  });
};

// app/routes/user/$userId.tsx
var userId_exports = {};
__export(userId_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  default: () => userId_default,
  loader: () => loader12,
});
var import_react13 = require("@remix-run/react"),
  import_remix_typedjson14 = require("remix-typedjson"),
  import_tiny_invariant12 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader12 = async ({ request, context, params }) => {
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    }),
      (0, import_tiny_invariant12.default)(
        params.userId,
        "params.userId is required"
      ),
      await prisma.$connect();
    let user = await prisma.user.findUniqueOrThrow({
      where: { id: params.userId },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson14.typedjson)({ user })
    );
  },
  ErrorBoundary2 = ({ error }) => (
    console.error(error),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "h2",
            {
              children: "Ah n\xE3o!",
            },
            void 0,
            !1,
            {
              fileName: "app/routes/user/$userId.tsx",
              lineNumber: 41,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "h3",
            {
              children: "Algo de errado n\xE3o est\xE1 certo",
            },
            void 0,
            !1,
            {
              fileName: "app/routes/user/$userId.tsx",
              lineNumber: 42,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              children: [error.name, " - ", error.message],
            },
            void 0,
            !0,
            {
              fileName: "app/routes/user/$userId.tsx",
              lineNumber: 43,
              columnNumber: 7,
            },
            this
          ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/routes/user/$userId.tsx",
        lineNumber: 40,
        columnNumber: 5,
      },
      this
    )
  );
function userId_default() {
  let { user } = (0, import_remix_typedjson14.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Panel,
        {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "div",
              {
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MyH1,
                    {
                      children: user.name,
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/user/$userId.tsx",
                      lineNumber: 57,
                      columnNumber: 11,
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "span",
                    {
                      children: user.email,
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/user/$userId.tsx",
                      lineNumber: 58,
                      columnNumber: 11,
                    },
                    this
                  ),
                ],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/user/$userId.tsx",
                lineNumber: 56,
                columnNumber: 9,
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "header",
              {
                className: "flex",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MyNavLink,
                    {
                      to: `/user/${user.id}`,
                      children: "Sobre",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/user/$userId.tsx",
                      lineNumber: 61,
                      columnNumber: 11,
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MyNavLink,
                    {
                      to: `/user/${user.id}/posts`,
                      children: "Posts",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/user/$userId.tsx",
                      lineNumber: 62,
                      columnNumber: 11,
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MyNavLink,
                    {
                      to: `/user/${user.id}/comments`,
                      children: "Comments",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/user/$userId.tsx",
                      lineNumber: 63,
                      columnNumber: 11,
                    },
                    this
                  ),
                ],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/user/$userId.tsx",
                lineNumber: 60,
                columnNumber: 9,
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_react13.Outlet,
              {},
              void 0,
              !1,
              {
                fileName: "app/routes/user/$userId.tsx",
                lineNumber: 65,
                columnNumber: 9,
              },
              this
            ),
          ],
        },
        void 0,
        !0,
        {
          fileName: "app/routes/user/$userId.tsx",
          lineNumber: 55,
          columnNumber: 7,
        },
        this
      ),
    },
    void 0,
    !1,
    {
      fileName: "app/routes/user/$userId.tsx",
      lineNumber: 54,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/user/$userId/comments.tsx
var comments_exports = {};
__export(comments_exports, {
  default: () => comments_default,
  loader: () => loader13,
});
var import_remix_typedjson15 = require("remix-typedjson"),
  import_tiny_invariant13 = __toESM(require("tiny-invariant"));

// app/components/feed/standalone-post.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  descriptionLimit2 = 100,
  StandalonePost = ({ post }) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      Panel,
      {
        className: "border-[1px] border-solid border-gray-300",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "flex gap-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/user/${post.User.id}`,
                              children: post.User.name,
                            },
                            void 0,
                            !1,
                            {
                              fileName:
                                "app/components/feed/standalone-post.tsx",
                              lineNumber: 17,
                              columnNumber: 11,
                            },
                            this
                          ),
                          " postou em ",
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/feed/${post.Feed.id}`,
                              children: post.Feed.title,
                            },
                            void 0,
                            !1,
                            {
                              fileName:
                                "app/components/feed/standalone-post.tsx",
                              lineNumber: 18,
                              columnNumber: 14,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/components/feed/standalone-post.tsx",
                        lineNumber: 16,
                        columnNumber: 9,
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "div",
                      {
                        children: "|",
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/feed/standalone-post.tsx",
                        lineNumber: 20,
                        columnNumber: 9,
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      DateTime2,
                      {
                        children: post.createdAt,
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/feed/standalone-post.tsx",
                        lineNumber: 21,
                        columnNumber: 9,
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      MyLink,
                      {
                        to: `/post/${post.id}`,
                        children: "#ref",
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/feed/standalone-post.tsx",
                        lineNumber: 22,
                        columnNumber: 9,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                !0,
                {
                  fileName: "app/components/feed/standalone-post.tsx",
                  lineNumber: 15,
                  columnNumber: 7,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "hr",
                {
                  className: "my-2",
                },
                void 0,
                !1,
                {
                  fileName: "app/components/feed/standalone-post.tsx",
                  lineNumber: 24,
                  columnNumber: 7,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "h3",
                {
                  className: "font-bold",
                  children: post.title,
                },
                void 0,
                !1,
                {
                  fileName: "app/components/feed/standalone-post.tsx",
                  lineNumber: 25,
                  columnNumber: 7,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "p",
                {
                  children:
                    post.description.substring(0, descriptionLimit2) +
                    (post.description.length > descriptionLimit2
                      ? "\u2026"
                      : ""),
                },
                void 0,
                !1,
                {
                  fileName: "app/components/feed/standalone-post.tsx",
                  lineNumber: 26,
                  columnNumber: 7,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/components/feed/standalone-post.tsx",
            lineNumber: 14,
            columnNumber: 5,
          },
          this
        ),
      },
      post.id,
      !1,
      {
        fileName: "app/components/feed/standalone-post.tsx",
        lineNumber: 13,
        columnNumber: 3,
      },
      this
    );

// app/components/feed/standalone-comment.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  descriptionLimit3 = 100,
  StandaloneComment = ({ comment }) =>
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      Panel,
      {
        className: "border-[1px] border-solid border-gray-300",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              className: "flex gap-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "div",
                  {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyLink,
                        {
                          to: `/user/${comment.User.id}`,
                          children: comment.User.name,
                        },
                        void 0,
                        !1,
                        {
                          fileName:
                            "app/components/feed/standalone-comment.tsx",
                          lineNumber: 20,
                          columnNumber: 9,
                        },
                        this
                      ),
                      " ",
                      "comentou",
                    ],
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/components/feed/standalone-comment.tsx",
                    lineNumber: 19,
                    columnNumber: 7,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "div",
                  {
                    children: "|",
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/standalone-comment.tsx",
                    lineNumber: 23,
                    columnNumber: 7,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  DateTime2,
                  {
                    children: comment.createdAt,
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/standalone-comment.tsx",
                    lineNumber: 24,
                    columnNumber: 7,
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  MyLink,
                  {
                    to: `/post/${comment.Post.id}?comment=${comment.id}`,
                    children: "#ref",
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feed/standalone-comment.tsx",
                    lineNumber: 25,
                    columnNumber: 7,
                  },
                  this
                ),
              ],
            },
            void 0,
            !0,
            {
              fileName: "app/components/feed/standalone-comment.tsx",
              lineNumber: 18,
              columnNumber: 5,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "hr",
            {
              className: "my-2",
            },
            void 0,
            !1,
            {
              fileName: "app/components/feed/standalone-comment.tsx",
              lineNumber: 29,
              columnNumber: 5,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "p",
            {
              children:
                comment.description.substring(0, descriptionLimit3) +
                (comment.description.length > descriptionLimit3
                  ? "\u2026"
                  : ""),
            },
            void 0,
            !1,
            {
              fileName: "app/components/feed/standalone-comment.tsx",
              lineNumber: 30,
              columnNumber: 5,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            StandalonePost,
            {
              post: comment.Post,
            },
            void 0,
            !1,
            {
              fileName: "app/components/feed/standalone-comment.tsx",
              lineNumber: 34,
              columnNumber: 5,
            },
            this
          ),
        ],
      },
      comment.id,
      !0,
      {
        fileName: "app/components/feed/standalone-comment.tsx",
        lineNumber: 17,
        columnNumber: 3,
      },
      this
    );

// app/routes/user/$userId/comments.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader13 = async ({ request, context, params }) => {
    var _a, _b, _c;
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    let tenantId =
      ((_a = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      )) == null
        ? void 0
        : _a.toString()) || "";
    (0, import_tiny_invariant13.default)(
      params.userId,
      "params.userId is required"
    );
    let url = new URL(request.url),
      after =
        (_b = url.searchParams.get("after")) == null ? void 0 : _b.toString(),
      prevAfter =
        (_c = url.searchParams.get("prevAfter")) == null
          ? void 0
          : _c.toString();
    await prisma.$connect();
    let comments = await prisma.comment.findMany({
      where: { userId: params.userId, Post: { Feed: { tenantId } } },
      include: { Post: { include: { Feed: !0, User: !0 } }, User: !0 },
      take: 2,
      skip: after ? 1 : 0,
      cursor: after
        ? {
            id: after,
          }
        : void 0,
      orderBy: { id: "desc" },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson15.typedjson)({
        comments,
        userId: params.userId,
        after,
        prevAfter,
      })
    );
  };
function comments_default() {
  let { comments, userId, after, prevAfter } = (0,
    import_remix_typedjson15.useTypedLoaderData)(),
    nextPageUrl = comments.length
      ? `/user/${userId}/comments?after=${comments[comments.length - 1].id}` +
        (after ? `&prevAfter=${after}` : "")
      : null,
    prevPageUrl = after
      ? `/user/${userId}/comments` + (prevAfter ? `?after=${prevAfter}` : "")
      : null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH2,
          {
            children: "Comments",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/user/$userId/comments.tsx",
            lineNumber: 76,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "hr",
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/user/$userId/comments.tsx",
            lineNumber: 77,
            columnNumber: 7,
          },
          this
        ),
        prevPageUrl &&
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            MyLink,
            {
              to: prevPageUrl,
              children: ["<-", " Mais recentes"],
            },
            void 0,
            !0,
            {
              fileName: "app/routes/user/$userId/comments.tsx",
              lineNumber: 78,
              columnNumber: 23,
            },
            this
          ),
        comments.map((comment) =>
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            StandaloneComment,
            {
              comment,
            },
            void 0,
            !1,
            {
              fileName: "app/routes/user/$userId/comments.tsx",
              lineNumber: 80,
              columnNumber: 9,
            },
            this
          )
        ),
        nextPageUrl
          ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              MyLink,
              {
                to: nextPageUrl,
                children: ["Mais antigos ", "->"],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/user/$userId/comments.tsx",
                lineNumber: 83,
                columnNumber: 9,
              },
              this
            )
          : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "div",
              {
                children: "N\xE3o h\xE1 coment\xE1rios mais antigos",
              },
              void 0,
              !1,
              {
                fileName: "app/routes/user/$userId/comments.tsx",
                lineNumber: 85,
                columnNumber: 9,
              },
              this
            ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/user/$userId/comments.tsx",
      lineNumber: 75,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/user/$userId/index.tsx
var userId_exports2 = {};
__export(userId_exports2, {
  default: () => userId_default2,
  loader: () => loader14,
});
var import_remix_typedjson16 = require("remix-typedjson"),
  import_tiny_invariant14 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader14 = async ({ request, context, params }) => {
    var _a;
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    }),
      (0, import_tiny_invariant14.default)(
        params.userId,
        "params.userId is required"
      );
    let tenantId =
      ((_a = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      )) == null
        ? void 0
        : _a.toString()) || "";
    await prisma.$connect();
    let user = await prisma.user.findUniqueOrThrow({
      where: { id: params.userId },
      include: {
        _count: {
          select: {
            Post: { where: { Feed: { tenantId } } },
            Comment: { where: { Post: { Feed: { tenantId } } } },
          },
        },
      },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson16.typedjson)({ user })
    );
  };
function userId_default2() {
  let { user } = (0, import_remix_typedjson16.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH2,
          {
            children: "Sobre",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/user/$userId/index.tsx",
            lineNumber: 43,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "hr",
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/user/$userId/index.tsx",
            lineNumber: 44,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "p",
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "b",
                {
                  children: "Cadastrado em:",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/user/$userId/index.tsx",
                  lineNumber: 46,
                  columnNumber: 9,
                },
                this
              ),
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                DateTime2,
                {
                  children: user.createdAt,
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/user/$userId/index.tsx",
                  lineNumber: 46,
                  columnNumber: 31,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/user/$userId/index.tsx",
            lineNumber: 45,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "p",
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "b",
                {
                  children: "Posts:",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/user/$userId/index.tsx",
                  lineNumber: 49,
                  columnNumber: 9,
                },
                this
              ),
              " ",
              user._count.Post,
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/user/$userId/index.tsx",
            lineNumber: 48,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "p",
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "b",
                {
                  children: "Coment\xE1rios:",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/user/$userId/index.tsx",
                  lineNumber: 52,
                  columnNumber: 9,
                },
                this
              ),
              " ",
              user._count.Comment,
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/user/$userId/index.tsx",
            lineNumber: 51,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/user/$userId/index.tsx",
      lineNumber: 42,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/user/$userId/posts.tsx
var posts_exports = {};
__export(posts_exports, {
  default: () => posts_default,
  loader: () => loader15,
});
var import_remix_typedjson17 = require("remix-typedjson"),
  import_tiny_invariant15 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader15 = async ({ request, context, params }) => {
    var _a, _b, _c;
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    let tenantId =
      ((_a = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      )) == null
        ? void 0
        : _a.toString()) || "";
    (0, import_tiny_invariant15.default)(
      params.userId,
      "params.userId is required"
    );
    let url = new URL(request.url),
      after =
        (_b = url.searchParams.get("after")) == null ? void 0 : _b.toString(),
      prevAfter =
        (_c = url.searchParams.get("prevAfter")) == null
          ? void 0
          : _c.toString();
    await prisma.$connect();
    let posts = await prisma.post.findMany({
      where: { userId: params.userId, Feed: { tenantId } },
      include: { Feed: !0, User: !0 },
      take: 2,
      skip: after ? 1 : 0,
      cursor: after
        ? {
            id: after,
          }
        : void 0,
      orderBy: { id: "desc" },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson17.typedjson)({
        posts,
        userId: params.userId,
        after,
        prevAfter,
      })
    );
  };
function posts_default() {
  let { posts, userId, after, prevAfter } = (0,
    import_remix_typedjson17.useTypedLoaderData)(),
    nextPageUrl = posts.length
      ? `/user/${userId}/posts?after=${posts[posts.length - 1].id}` +
        (after ? `&prevAfter=${after}` : "")
      : null,
    prevPageUrl = after
      ? `/user/${userId}/posts` + (prevAfter ? `?after=${prevAfter}` : "")
      : null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH2,
          {
            children: "Posts",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/user/$userId/posts.tsx",
            lineNumber: 76,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "hr",
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/user/$userId/posts.tsx",
            lineNumber: 77,
            columnNumber: 7,
          },
          this
        ),
        prevPageUrl &&
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            MyLink,
            {
              to: prevPageUrl,
              children: ["<-", " Mais recentes"],
            },
            void 0,
            !0,
            {
              fileName: "app/routes/user/$userId/posts.tsx",
              lineNumber: 78,
              columnNumber: 23,
            },
            this
          ),
        posts.map((post) =>
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            StandalonePost,
            {
              post,
            },
            void 0,
            !1,
            {
              fileName: "app/routes/user/$userId/posts.tsx",
              lineNumber: 80,
              columnNumber: 9,
            },
            this
          )
        ),
        nextPageUrl
          ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              MyLink,
              {
                to: nextPageUrl,
                children: ["Mais antigos ", "->"],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/user/$userId/posts.tsx",
                lineNumber: 83,
                columnNumber: 9,
              },
              this
            )
          : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "div",
              {
                children: "N\xE3o h\xE1 posts mais antigos",
              },
              void 0,
              !1,
              {
                fileName: "app/routes/user/$userId/posts.tsx",
                lineNumber: 85,
                columnNumber: 9,
              },
              this
            ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/user/$userId/posts.tsx",
      lineNumber: 75,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/login/index.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action10,
  default: () => Index5,
  loader: () => loader16,
  validator: () => validator4,
});
var import_with_zod6 = require("@remix-validated-form/with-zod"),
  import_remix_typedjson18 = require("remix-typedjson"),
  import_remix_validated_form10 = require("remix-validated-form"),
  import_zod6 = require("zod");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  validator4 = (0, import_with_zod6.withZod)(
    import_zod6.z.object({
      email: import_zod6.z
        .string()
        .min(1, { message: "Email is required" })
        .email("Must be a valid email"),
      password: import_zod6.z
        .string()
        .min(1, { message: "Password is required" }),
    })
  );
async function loader16({ request }) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
var action10 = async ({ request, context, params }) => {
  let result = await validator4.validate(await request.clone().formData());
  if (result.error)
    return (0, import_remix_validated_form10.validationError)(
      result.error,
      result.data
    );
  let user = await authenticator.authenticate("user-pass", request, {
    failureRedirect: "/login",
  });
  await prisma.$connect();
  let tenantUser = await prisma.tenantUser.findFirst({
    where: { userId: user.id },
  });
  if ((await prisma.$disconnect(), !tenantUser))
    return (0, import_remix_typedjson18.redirect)("/");
  let session = await getSession(request.headers.get("cookie"));
  return (
    session.set("tenantId", tenantUser.tenantId),
    session.set(authenticator.sessionKey, user),
    (0, import_remix_typedjson18.redirect)("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  );
};
function Index5() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children: "Login",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login/index.tsx",
            lineNumber: 77,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            className: "max-w-lg mx-auto",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_remix_validated_form10.ValidatedForm,
                {
                  validator: validator4,
                  method: "post",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "fieldset",
                    {
                      className: "flex flex-col gap-2",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MyInput,
                          {
                            name: "email",
                            label: "Email",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/login/index.tsx",
                            lineNumber: 81,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MyInput,
                          {
                            name: "password",
                            label: "Password",
                            type: "password",
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/login/index.tsx",
                            lineNumber: 82,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          MySubmitButton,
                          {},
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/login/index.tsx",
                            lineNumber: 83,
                            columnNumber: 13,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/login/index.tsx",
                      lineNumber: 80,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/login/index.tsx",
                  lineNumber: 79,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "h2",
                {
                  children: "Esqueceu o seu e-mail ou a sua senha?",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/login/index.tsx",
                  lineNumber: 86,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "span",
                {
                  className: "text-sm",
                  children: "problema seu",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/login/index.tsx",
                  lineNumber: 87,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/login/index.tsx",
            lineNumber: 78,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/login/index.tsx",
      lineNumber: 76,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/users/index.tsx
var users_exports = {};
__export(users_exports, {
  default: () => Index6,
  loader: () => loader17,
});
var import_react14 = require("@remix-run/react"),
  import_remix_typedjson19 = require("remix-typedjson"),
  import_tiny_invariant16 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader17 = async ({ request, context }) => {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant16.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      await prisma.$connect();
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
    });
    if (
      user.type !== "SUPERADMIN" &&
      (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER"
    )
      return (
        await prisma.$disconnect(), (0, import_remix_typedjson19.redirect)("/")
      );
    let tenantUsers = await prisma.tenantUser.findMany({
      include: { User: !0 },
      where: { tenantId },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson19.typedjson)({ tenantUsers })
    );
  };
function Index6() {
  let { tenantUsers } = (0, import_remix_typedjson19.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyH1,
                {
                  children: "Users",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/users/index.tsx",
                  lineNumber: 63,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "ul",
                {
                  children: tenantUsers.map((tenantUser) =>
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "li",
                      {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/user/${tenantUser.User.id}`,
                              children: tenantUser.User.name,
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/users/index.tsx",
                              lineNumber: 67,
                              columnNumber: 15,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/users/${tenantUser.User.id}/remove`,
                              children: "Remover",
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/users/index.tsx",
                              lineNumber: 70,
                              columnNumber: 15,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/users/index.tsx",
                        lineNumber: 66,
                        columnNumber: 13,
                      },
                      this
                    )
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/users/index.tsx",
                  lineNumber: 64,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/users/index.tsx",
            lineNumber: 62,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react14.Outlet,
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/users/index.tsx",
            lineNumber: 77,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/users/index.tsx",
      lineNumber: 61,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/feed/types.ts
var types_exports = {};

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => Index7,
  loader: () => loader18,
});
var import_react15 = require("@remix-run/react"),
  import_remix_typedjson20 = require("remix-typedjson");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader18 = async ({ request }) =>
    (
      await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      })
    ).type !== "SUPERADMIN"
      ? (0, import_remix_typedjson20.redirect)("/")
      : null;
function Index7() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      className: "flex",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "nav",
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyNavLink,
                {
                  to: "/admin/tenants",
                  children: "Tenants",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 23,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyNavLink,
                {
                  to: "/admin/users",
                  children: "Usu\xE1rios",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 24,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 22,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_react15.Outlet,
              {},
              void 0,
              !1,
              {
                fileName: "app/routes/admin.tsx",
                lineNumber: 27,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 26,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/admin.tsx",
      lineNumber: 21,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/admin/tenants/index.tsx
var tenants_exports = {};
__export(tenants_exports, {
  action: () => action11,
  default: () => Index8,
  loader: () => loader19,
  validator: () => validator5,
});
var import_with_zod7 = require("@remix-validated-form/with-zod"),
  import_remix_typedjson21 = require("remix-typedjson"),
  import_remix_validated_form11 = require("remix-validated-form"),
  import_zod7 = require("zod");
var import_ulid6 = require("ulid"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  validator5 = (0, import_with_zod7.withZod)(
    import_zod7.z.object({
      name: import_zod7.z.string().min(5, { message: "Name is required" }),
    })
  ),
  loader19 = async ({ request, context }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    if (!user || user.type !== "SUPERADMIN")
      return (0, import_remix_typedjson21.redirect)("/");
    await prisma.$connect();
    let tenants = await prisma.tenant.findMany({
      include: {
        _count: {
          select: {
            TenantUser: !0,
            Feed: !0,
          },
        },
      },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson21.typedjson)({ tenants })
    );
  },
  action11 = async ({ request, context, params }) => {
    let validated = await validator5.validate(await request.clone().formData());
    if (validated.error)
      return (0, import_remix_validated_form11.validationError)(
        validated.error,
        validated.data
      );
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    return !user || user.type !== "SUPERADMIN"
      ? (0, import_remix_typedjson21.redirect)("/")
      : (await prisma.$connect(),
        await prisma.tenant.create({
          data: {
            id: (0, import_ulid6.ulid)(),
            name: validated.data.name,
          },
        }),
        await prisma.$disconnect(),
        (0, import_remix_typedjson21.redirect)("/admin/tenants"));
  };
function Index8() {
  let { tenants } = (0, import_remix_typedjson21.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children: "Tenants",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin/tenants/index.tsx",
            lineNumber: 107,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_remix_validated_form11.ValidatedForm,
              {
                validator: validator5,
                method: "post",
                resetAfterSubmit: !0,
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "fieldset",
                  {
                    className: "flex flex-col gap-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyH2,
                        {
                          children: "Criar tenant",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/admin/tenants/index.tsx",
                          lineNumber: 111,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MyInput,
                        {
                          name: "name",
                          label: "Nome",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/admin/tenants/index.tsx",
                          lineNumber: 112,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        MySubmitButton,
                        {},
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/admin/tenants/index.tsx",
                          lineNumber: 113,
                          columnNumber: 13,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/admin/tenants/index.tsx",
                    lineNumber: 110,
                    columnNumber: 11,
                  },
                  this
                ),
              },
              void 0,
              !1,
              {
                fileName: "app/routes/admin/tenants/index.tsx",
                lineNumber: 109,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin/tenants/index.tsx",
            lineNumber: 108,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyH2,
                {
                  children: "Tenants existentes",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin/tenants/index.tsx",
                  lineNumber: 118,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "ul",
                {
                  children: tenants.map((tenant) =>
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "li",
                      {
                        className: "py-1",
                        children: [
                          tenant.name,
                          " (",
                          tenant._count.Feed,
                          " feeds,",
                          " ",
                          tenant._count.TenantUser,
                          " users)",
                        ],
                      },
                      tenant.id,
                      !0,
                      {
                        fileName: "app/routes/admin/tenants/index.tsx",
                        lineNumber: 121,
                        columnNumber: 13,
                      },
                      this
                    )
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin/tenants/index.tsx",
                  lineNumber: 119,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/admin/tenants/index.tsx",
            lineNumber: 117,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/admin/tenants/index.tsx",
      lineNumber: 106,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/admin/users.tsx
var users_exports2 = {};
__export(users_exports2, {
  default: () => Index9,
  loader: () => loader20,
});
var import_react16 = require("@remix-run/react"),
  import_remix_typedjson22 = require("remix-typedjson");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader20 = async ({ request, context }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    if (!user || user.type !== "SUPERADMIN")
      return (0, import_remix_typedjson22.redirect)("/");
    await prisma.$connect();
    let [users, tenants] = await Promise.all([
      prisma.user.findMany({
        include: { TenantUser: !0 },
      }),
      prisma.tenant.findMany(),
    ]);
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson22.typedjson)({ users, tenants })
    );
  };
function Index9() {
  let { users } = (0, import_remix_typedjson22.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Panel,
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyH1,
                {
                  children: "Users",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin/users.tsx",
                  lineNumber: 50,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "ul",
                {
                  children: users.map((user) =>
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "li",
                      {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/user/${user.id}`,
                              children: user.name,
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/admin/users.tsx",
                              lineNumber: 54,
                              columnNumber: 15,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            MyLink,
                            {
                              to: `/admin/users/${user.id}/tenants`,
                              children: [user.TenantUser.length, " tenants"],
                            },
                            void 0,
                            !0,
                            {
                              fileName: "app/routes/admin/users.tsx",
                              lineNumber: 55,
                              columnNumber: 15,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/admin/users.tsx",
                        lineNumber: 53,
                        columnNumber: 13,
                      },
                      this
                    )
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin/users.tsx",
                  lineNumber: 51,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/admin/users.tsx",
            lineNumber: 49,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react16.Outlet,
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/admin/users.tsx",
            lineNumber: 62,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/admin/users.tsx",
      lineNumber: 48,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/admin/users/$userId/tenants.tsx
var tenants_exports2 = {};
__export(tenants_exports2, {
  action: () => action12,
  default: () => UserTenantsModal2,
  links: () => links5,
  loader: () => loader21,
});
var import_dialog4 = require("@reach/dialog");
var import_react17 = require("@remix-run/react"),
  import_remix_typedjson23 = require("remix-typedjson"),
  import_tiny_invariant17 = __toESM(require("tiny-invariant"));
var import_ulid7 = require("ulid"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  links5 = () => [
    {
      rel: "stylesheet",
      href: styles_default,
    },
  ],
  loader21 = async ({ request, context, params }) => {
    (0, import_tiny_invariant17.default)(
      typeof params.userId == "string",
      "userId should be a string"
    );
    let [user, tenantsWithoutUser] = await Promise.all([
      prisma.user.findUniqueOrThrow({
        where: { id: params.userId },
        include: { TenantUser: { include: { Tenant: !0 } } },
      }),
      prisma.tenant.findMany({
        where: {
          NOT: {
            TenantUser: {
              some: {
                userId: params.userId,
              },
            },
          },
        },
      }),
    ]);
    return (0, import_remix_typedjson23.typedjson)({
      user,
      tenantsWithoutUser,
    });
  },
  action12 = async ({ request, context, params }) => {
    let body = await request.formData(),
      { _action, ...values } = Object.fromEntries(body);
    return (
      (0, import_tiny_invariant17.default)(
        typeof params.userId == "string",
        "params.userId should be a string"
      ),
      await prisma.$connect(),
      _action === "add" &&
        ((0, import_tiny_invariant17.default)(
          typeof values.tenantId == "string",
          "values.tenantId should be a string"
        ),
        await prisma.tenantUser.create({
          data: {
            id: (0, import_ulid7.ulid)(),
            tenantId: values.tenantId,
            userId: params.userId,
          },
        })),
      _action === "remove" &&
        ((0, import_tiny_invariant17.default)(
          typeof values.tenantUserId == "string",
          "values.tenantUserId should be a string"
        ),
        await prisma.tenantUser.delete({
          where: {
            id: values.tenantUserId,
          },
        })),
      await prisma.$disconnect(),
      (0, import_remix_typedjson23.redirect)(
        `/admin/users/${params.userId}/tenants`
      )
    );
  };
function UserTenantsModal2() {
  let navigate = (0, import_react17.useNavigate)(),
    onDismiss = () => navigate("/admin/users"),
    { user, tenantsWithoutUser } = (0,
    import_remix_typedjson23.useTypedLoaderData)(),
    title = `Edit ${user.name}'s Tenants`;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    import_dialog4.Dialog,
    {
      className: "dialog",
      isOpen: !0,
      "aria-label": title,
      onDismiss,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH3,
          {
            children: title,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin/users/$userId/tenants.tsx",
            lineNumber: 101,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "ul",
          {
            children: user.TenantUser.map((tenantUser) =>
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "li",
                {
                  children: [
                    tenantUser.Tenant.name,
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      import_react17.Form,
                      {
                        method: "post",
                        style: { display: "inline" },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "input",
                            {
                              type: "hidden",
                              name: "tenantUserId",
                              value: tenantUser.id,
                            },
                            void 0,
                            !1,
                            {
                              fileName:
                                "app/routes/admin/users/$userId/tenants.tsx",
                              lineNumber: 107,
                              columnNumber: 15,
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                            "button",
                            {
                              type: "submit",
                              name: "_action",
                              value: "remove",
                              children: "Remove",
                            },
                            void 0,
                            !1,
                            {
                              fileName:
                                "app/routes/admin/users/$userId/tenants.tsx",
                              lineNumber: 108,
                              columnNumber: 15,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/admin/users/$userId/tenants.tsx",
                        lineNumber: 106,
                        columnNumber: 13,
                      },
                      this
                    ),
                  ],
                },
                tenantUser.tenantId,
                !0,
                {
                  fileName: "app/routes/admin/users/$userId/tenants.tsx",
                  lineNumber: 104,
                  columnNumber: 11,
                },
                this
              )
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin/users/$userId/tenants.tsx",
            lineNumber: 102,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react17.Form,
          {
            method: "post",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "select",
                {
                  name: "tenantId",
                  children: tenantsWithoutUser.map((tenant) =>
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "option",
                      {
                        value: tenant.id,
                        children: tenant.name,
                      },
                      tenant.id,
                      !1,
                      {
                        fileName: "app/routes/admin/users/$userId/tenants.tsx",
                        lineNumber: 118,
                        columnNumber: 13,
                      },
                      this
                    )
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin/users/$userId/tenants.tsx",
                  lineNumber: 116,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "button",
                {
                  type: "submit",
                  name: "_action",
                  value: "add",
                  children: "Add",
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin/users/$userId/tenants.tsx",
                  lineNumber: 123,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/admin/users/$userId/tenants.tsx",
            lineNumber: 115,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/admin/users/$userId/tenants.tsx",
      lineNumber: 95,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/feeds.tsx
var feeds_exports = {};
__export(feeds_exports, {
  ErrorBoundary: () => ErrorBoundary3,
  default: () => feeds_default,
  loader: () => loader22,
});
var import_react18 = require("@remix-run/react"),
  import_remix_typedjson24 = require("remix-typedjson"),
  import_tiny_invariant18 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader22 = async ({ request, context, params }) => {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant18.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    );
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
      include: { Tenant: { include: { Feed: !0 } } },
    });
    return (
      await prisma.$connect(),
      (user.type !== "SUPERADMIN" &&
        (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER") ||
      !(tenantUser != null && tenantUser.Tenant)
        ? (await prisma.$disconnect(),
          (0, import_remix_typedjson24.redirect)("/"))
        : (await prisma.$disconnect(),
          (0, import_remix_typedjson24.typedjson)({
            tenant: tenantUser.Tenant,
            feeds: tenantUser.Tenant.Feed,
          }))
    );
  },
  ErrorBoundary3 = ({ error }) => (
    console.error(error),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "h2",
            {
              children: "Ah n\xE3o!",
            },
            void 0,
            !1,
            {
              fileName: "app/routes/feeds.tsx",
              lineNumber: 66,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "h3",
            {
              children: "Algo de errado n\xE3o est\xE1 certo",
            },
            void 0,
            !1,
            {
              fileName: "app/routes/feeds.tsx",
              lineNumber: 67,
              columnNumber: 7,
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              children: [error.name, " - ", error.message],
            },
            void 0,
            !0,
            {
              fileName: "app/routes/feeds.tsx",
              lineNumber: 68,
              columnNumber: 7,
            },
            this
          ),
        ],
      },
      void 0,
      !0,
      {
        fileName: "app/routes/feeds.tsx",
        lineNumber: 65,
        columnNumber: 5,
      },
      this
    )
  );
function feeds_default() {
  let { tenant, feeds } = (0, import_remix_typedjson24.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "main",
          {
            className: "container mx-auto",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                MyH1,
                {
                  children: tenant.name,
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/feeds.tsx",
                  lineNumber: 81,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Panel,
                {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MyLink,
                    {
                      to: "/feeds/create",
                      className:
                        "ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white",
                      children: "Criar Feed",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/feeds.tsx",
                      lineNumber: 83,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/feeds.tsx",
                  lineNumber: 82,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Panel,
                {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      MyH2,
                      {
                        children: "Feeds existentes",
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/feeds.tsx",
                        lineNumber: 91,
                        columnNumber: 11,
                      },
                      this
                    ),
                    feeds.map((feed) =>
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        import_jsx_dev_runtime.Fragment,
                        {
                          children: /* @__PURE__ */ (0,
                          import_jsx_dev_runtime.jsxDEV)(
                            "div",
                            {
                              children: /* @__PURE__ */ (0,
                              import_jsx_dev_runtime.jsxDEV)(
                                "h3",
                                {
                                  children: feed.title,
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/routes/feeds.tsx",
                                  lineNumber: 95,
                                  columnNumber: 17,
                                },
                                this
                              ),
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/feeds.tsx",
                              lineNumber: 94,
                              columnNumber: 15,
                            },
                            this
                          ),
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/feeds.tsx",
                          lineNumber: 93,
                          columnNumber: 13,
                        },
                        this
                      )
                    ),
                  ],
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/feeds.tsx",
                  lineNumber: 90,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: "app/routes/feeds.tsx",
            lineNumber: 80,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_react18.Outlet,
          {},
          void 0,
          !1,
          {
            fileName: "app/routes/feeds.tsx",
            lineNumber: 101,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/feeds.tsx",
      lineNumber: 79,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/feeds/create.tsx
var create_exports2 = {};
__export(create_exports2, {
  action: () => action13,
  default: () => TenantCreateFeedModal,
  links: () => links6,
  loader: () => loader23,
  validator: () => validator6,
});
var import_dialog5 = require("@reach/dialog");
var import_react19 = require("@remix-run/react"),
  import_with_zod8 = require("@remix-validated-form/with-zod"),
  import_remix_typedjson25 = require("remix-typedjson"),
  import_remix_validated_form12 = require("remix-validated-form"),
  import_tiny_invariant19 = __toESM(require("tiny-invariant")),
  import_zod8 = require("zod");
var import_ulid8 = require("ulid"),
  import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  validator6 = (0, import_with_zod8.withZod)(
    import_zod8.z.object({
      title: import_zod8.z.string().min(5, { message: "Title is required" }),
    })
  ),
  links6 = () => [
    {
      rel: "stylesheet",
      href: styles_default,
    },
  ],
  loader23 = async ({ request, context, params }) => {
    let tenantId = (await getSession(request.headers.get("cookie"))).get(
      "tenantId"
    );
    return (
      (0, import_tiny_invariant19.default)(
        typeof tenantId == "string",
        "session.tenantId should be a string"
      ),
      (0, import_remix_typedjson25.typedjson)({ tenantId })
    );
  },
  action13 = async ({ request, context, params }) => {
    let validated = await validator6.validate(await request.clone().formData());
    if (validated.error)
      return (0, import_remix_validated_form12.validationError)(
        validated.error,
        validated.data
      );
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      }),
      tenantId = (await getSession(request.headers.get("cookie"))).get(
        "tenantId"
      );
    (0, import_tiny_invariant19.default)(
      typeof tenantId == "string",
      "session.tenantId should be a string"
    ),
      await prisma.$connect();
    let tenantUser = await prisma.tenantUser.findFirst({
      where: { tenantId, userId: user.id },
    });
    return user.type !== "SUPERADMIN" &&
      (tenantUser == null ? void 0 : tenantUser.type) !== "MANAGER"
      ? (await prisma.$disconnect(),
        (0, import_remix_typedjson25.redirect)("/"))
      : (await prisma.feed.create({
          data: {
            id: (0, import_ulid8.ulid)(),
            title: validated.data.title,
            tenantId,
          },
        }),
        (0, import_remix_typedjson25.redirect)("/feeds"));
  };
function TenantCreateFeedModal() {
  let navigate = (0, import_react19.useNavigate)(),
    onDismiss = () => navigate("/feeds"),
    title = "Create feed";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    import_dialog5.Dialog,
    {
      className: "dialog",
      isOpen: !0,
      "aria-label": title,
      onDismiss,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH3,
          {
            children: title,
          },
          void 0,
          !1,
          {
            fileName: "app/routes/feeds/create.tsx",
            lineNumber: 110,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          import_remix_validated_form12.ValidatedForm,
          {
            validator: validator6,
            method: "post",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "fieldset",
              {
                className: "flex flex-col gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MyInput,
                    {
                      name: "title",
                      label: "T\xEDtulo",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/feeds/create.tsx",
                      lineNumber: 113,
                      columnNumber: 11,
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    MySubmitButton,
                    {},
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/feeds/create.tsx",
                      lineNumber: 114,
                      columnNumber: 11,
                    },
                    this
                  ),
                ],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/feeds/create.tsx",
                lineNumber: 112,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: "app/routes/feeds/create.tsx",
            lineNumber: 111,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/feeds/create.tsx",
      lineNumber: 104,
      columnNumber: 5,
    },
    this
  );
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index10,
  loader: () => loader24,
});
var import_remix_typedjson26 = require("remix-typedjson");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"),
  loader24 = async ({ request, context }) => {
    let tenantId = (await getSession(request.headers.get("cookie"))).get(
      "tenantId"
    );
    if (typeof tenantId != "string" || !tenantId)
      return (0, import_remix_typedjson26.typedjson)({ tenant: null });
    await prisma.$connect();
    let tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { Feed: !0 },
    });
    return (
      await prisma.$disconnect(),
      (0, import_remix_typedjson26.typedjson)({ tenant })
    );
  };
function Index10() {
  let { tenant } = (0, import_remix_typedjson26.useTypedLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "main",
    {
      className: "container mx-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          MyH1,
          {
            children: "Bem vindo",
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 29,
            columnNumber: 7,
          },
          this
        ),
        tenant
          ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_jsx_dev_runtime.Fragment,
              {
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "p",
                    {
                      children: [
                        "Voc\xEA est\xE1 logado no tenant ",
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                          "b",
                          {
                            children: tenant.name,
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/index.tsx",
                            lineNumber: 33,
                            columnNumber: 40,
                          },
                          this
                        ),
                        ".",
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/index.tsx",
                      lineNumber: 32,
                      columnNumber: 11,
                    },
                    this
                  ),
                  tenant.Feed.length
                    ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        "p",
                        {
                          children:
                            "Escolha um feed para visualizar na parte superior da p\xE1gina.",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/index.tsx",
                          lineNumber: 36,
                          columnNumber: 13,
                        },
                        this
                      )
                    : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        "p",
                        {
                          children:
                            "Ainda n\xE3o h\xE1 feeds cadastrados nesse tenant.",
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/index.tsx",
                          lineNumber: 38,
                          columnNumber: 13,
                        },
                        this
                      ),
                ],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/index.tsx",
                lineNumber: 31,
                columnNumber: 9,
              },
              this
            )
          : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_jsx_dev_runtime.Fragment,
              {
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "p",
                    {
                      children:
                        "Voc\xEA n\xE3o est\xE1 logado em nenhum tenant.",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/index.tsx",
                      lineNumber: 43,
                      columnNumber: 11,
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "p",
                    {
                      children:
                        "Aguarde um convite para conseguir utilizar a aplica\xE7\xE3o.",
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/index.tsx",
                      lineNumber: 44,
                      columnNumber: 11,
                    },
                    this
                  ),
                ],
              },
              void 0,
              !0,
              {
                fileName: "app/routes/index.tsx",
                lineNumber: 42,
                columnNumber: 9,
              },
              this
            ),
      ],
    },
    void 0,
    !0,
    {
      fileName: "app/routes/index.tsx",
      lineNumber: 28,
      columnNumber: 5,
    },
    this
  );
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = {
  version: "03d04386",
  entry: {
    module: "/build/entry.client-3UA4M7VL.js",
    imports: [
      "/build/_shared/chunk-3WCIELHM.js",
      "/build/_shared/chunk-DHRNOAZ3.js",
      "/build/_shared/chunk-4IYZMDEG.js",
    ],
  },
  routes: {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/root-KKPST5HY.js",
      imports: [
        "/build/_shared/chunk-56T2GLBK.js",
        "/build/_shared/chunk-ZDJCHI2Q.js",
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/admin": {
      id: "routes/admin",
      parentId: "root",
      path: "admin",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/admin-D3JTAEXO.js",
      imports: ["/build/_shared/chunk-WZRO4ZZR.js"],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/admin/tenants/index": {
      id: "routes/admin/tenants/index",
      parentId: "routes/admin",
      path: "tenants",
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/admin/tenants/index-4AQUV7JF.js",
      imports: [
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-P6OUJI3C.js",
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/admin/users": {
      id: "routes/admin/users",
      parentId: "routes/admin",
      path: "users",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/admin/users-NHW2HYVH.js",
      imports: [
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/admin/users/$userId/tenants": {
      id: "routes/admin/users/$userId/tenants",
      parentId: "routes/admin/users",
      path: ":userId/tenants",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/admin/users/$userId/tenants-4XZYXMAS.js",
      imports: [
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-EYL5FC4H.js",
        "/build/_shared/chunk-AUYLHJJM.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/create-account/index": {
      id: "routes/create-account/index",
      parentId: "root",
      path: "create-account",
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/create-account/index-K2SQUBBH.js",
      imports: [
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-P6OUJI3C.js",
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/feed/$feedId": {
      id: "routes/feed/$feedId",
      parentId: "root",
      path: "feed/:feedId",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/feed/$feedId-MLTI7IQG.js",
      imports: [
        "/build/_shared/chunk-SPNGZ2ME.js",
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-P6OUJI3C.js",
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/feed/$feedId/create-post": {
      id: "routes/feed/$feedId/create-post",
      parentId: "routes/feed/$feedId",
      path: "create-post",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/feed/$feedId/create-post-2ENMUO2Z.js",
      imports: void 0,
      hasAction: !0,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/feed/$feedId/load-posts": {
      id: "routes/feed/$feedId/load-posts",
      parentId: "routes/feed/$feedId",
      path: "load-posts",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/feed/$feedId/load-posts-CYG6VRSQ.js",
      imports: void 0,
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/feed/types": {
      id: "routes/feed/types",
      parentId: "root",
      path: "feed/types",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/feed/types-RM5RZV7A.js",
      imports: void 0,
      hasAction: !1,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/feeds": {
      id: "routes/feeds",
      parentId: "root",
      path: "feeds",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/feeds-DGIIHSB3.js",
      imports: [
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !0,
    },
    "routes/feeds/create": {
      id: "routes/feeds/create",
      parentId: "routes/feeds",
      path: "create",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/feeds/create-4EEDAMJY.js",
      imports: [
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-P6OUJI3C.js",
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-EYL5FC4H.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/index": {
      id: "routes/index",
      parentId: "root",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/index-OGUC3V2U.js",
      imports: ["/build/_shared/chunk-RV3H7LTU.js"],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/invite/index": {
      id: "routes/invite/index",
      parentId: "root",
      path: "invite",
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/invite/index-XMJYCNWD.js",
      imports: [
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/invite/respond/$tenantInviteId": {
      id: "routes/invite/respond/$tenantInviteId",
      parentId: "root",
      path: "invite/respond/:tenantInviteId",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/invite/respond/$tenantInviteId-YQGSHSR2.js",
      imports: void 0,
      hasAction: !0,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/invite/tenant": {
      id: "routes/invite/tenant",
      parentId: "root",
      path: "invite/tenant",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/invite/tenant-6BFVBI37.js",
      imports: [
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/invite/tenant/create": {
      id: "routes/invite/tenant/create",
      parentId: "routes/invite/tenant",
      path: "create",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/invite/tenant/create-SIBKY5TB.js",
      imports: [
        "/build/_shared/chunk-P6OUJI3C.js",
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-EYL5FC4H.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !0,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/invite/tenant/delete/$tenantInviteId": {
      id: "routes/invite/tenant/delete/$tenantInviteId",
      parentId: "routes/invite/tenant",
      path: "delete/:tenantInviteId",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/invite/tenant/delete/$tenantInviteId-NGJTSUXK.js",
      imports: [
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-EYL5FC4H.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/login/index": {
      id: "routes/login/index",
      parentId: "root",
      path: "login",
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/login/index-HIUHO725.js",
      imports: [
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-P6OUJI3C.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/logout/index": {
      id: "routes/logout/index",
      parentId: "root",
      path: "logout",
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/logout/index-ZDQQG7TG.js",
      imports: [
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/post/$postId": {
      id: "routes/post/$postId",
      parentId: "root",
      path: "post/:postId",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/post/$postId-6AHNSOFD.js",
      imports: [
        "/build/_shared/chunk-SPNGZ2ME.js",
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-5FUXATVX.js",
        "/build/_shared/chunk-ZGMDS5RT.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !0,
    },
    "routes/post/$postId/create-comment": {
      id: "routes/post/$postId/create-comment",
      parentId: "routes/post/$postId",
      path: "create-comment",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/post/$postId/create-comment-VZ6RKZ7H.js",
      imports: void 0,
      hasAction: !0,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/post/$postId/load-comments": {
      id: "routes/post/$postId/load-comments",
      parentId: "routes/post/$postId",
      path: "load-comments",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/post/$postId/load-comments-LI5V6VFZ.js",
      imports: void 0,
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/post/$postId/post-utils": {
      id: "routes/post/$postId/post-utils",
      parentId: "routes/post/$postId",
      path: "post-utils",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/post/$postId/post-utils-S3TX62VU.js",
      imports: void 0,
      hasAction: !1,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/user/$userId": {
      id: "routes/user/$userId",
      parentId: "root",
      path: "user/:userId",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/user/$userId-KZJOVVWA.js",
      imports: [
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !0,
    },
    "routes/user/$userId/comments": {
      id: "routes/user/$userId/comments",
      parentId: "routes/user/$userId",
      path: "comments",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/user/$userId/comments-AXFT6WBR.js",
      imports: [
        "/build/_shared/chunk-CVFQHZ7E.js",
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/user/$userId/index": {
      id: "routes/user/$userId/index",
      parentId: "routes/user/$userId",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/user/$userId/index-JJ3RWAV7.js",
      imports: [
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/user/$userId/posts": {
      id: "routes/user/$userId/posts",
      parentId: "routes/user/$userId",
      path: "posts",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/user/$userId/posts-Y73N3TBD.js",
      imports: [
        "/build/_shared/chunk-CVFQHZ7E.js",
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-TX7YBFJI.js",
        "/build/_shared/chunk-EJGVOGMO.js",
        "/build/_shared/chunk-PWC6HNH5.js",
        "/build/_shared/chunk-7HIIZWYF.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/users/$userId/remove": {
      id: "routes/users/$userId/remove",
      parentId: "root",
      path: "users/:userId/remove",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/users/$userId/remove-LVI6BJBB.js",
      imports: [
        "/build/_shared/chunk-EYL5FC4H.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/users/index": {
      id: "routes/users/index",
      parentId: "root",
      path: "users",
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/users/index-ECVCQ7WS.js",
      imports: [
        "/build/_shared/chunk-UFFF3ZFI.js",
        "/build/_shared/chunk-UVUQPYCH.js",
        "/build/_shared/chunk-AUYLHJJM.js",
        "/build/_shared/chunk-RV3H7LTU.js",
        "/build/_shared/chunk-WZRO4ZZR.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
  },
  url: "/build/manifest-03D04386.js",
};

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build",
  publicPath = "/build/",
  entry = { module: entry_server_exports },
  routes = {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      module: root_exports,
    },
    "routes/invite/respond/$tenantInviteId": {
      id: "routes/invite/respond/$tenantInviteId",
      parentId: "root",
      path: "invite/respond/:tenantInviteId",
      index: void 0,
      caseSensitive: void 0,
      module: tenantInviteId_exports,
    },
    "routes/create-account/index": {
      id: "routes/create-account/index",
      parentId: "root",
      path: "create-account",
      index: !0,
      caseSensitive: void 0,
      module: create_account_exports,
    },
    "routes/users/$userId/remove": {
      id: "routes/users/$userId/remove",
      parentId: "root",
      path: "users/:userId/remove",
      index: void 0,
      caseSensitive: void 0,
      module: remove_exports,
    },
    "routes/invite/tenant": {
      id: "routes/invite/tenant",
      parentId: "root",
      path: "invite/tenant",
      index: void 0,
      caseSensitive: void 0,
      module: tenant_exports,
    },
    "routes/invite/tenant/delete/$tenantInviteId": {
      id: "routes/invite/tenant/delete/$tenantInviteId",
      parentId: "routes/invite/tenant",
      path: "delete/:tenantInviteId",
      index: void 0,
      caseSensitive: void 0,
      module: tenantInviteId_exports2,
    },
    "routes/invite/tenant/create": {
      id: "routes/invite/tenant/create",
      parentId: "routes/invite/tenant",
      path: "create",
      index: void 0,
      caseSensitive: void 0,
      module: create_exports,
    },
    "routes/feed/$feedId": {
      id: "routes/feed/$feedId",
      parentId: "root",
      path: "feed/:feedId",
      index: void 0,
      caseSensitive: void 0,
      module: feedId_exports,
    },
    "routes/feed/$feedId/create-post": {
      id: "routes/feed/$feedId/create-post",
      parentId: "routes/feed/$feedId",
      path: "create-post",
      index: void 0,
      caseSensitive: void 0,
      module: create_post_exports,
    },
    "routes/feed/$feedId/load-posts": {
      id: "routes/feed/$feedId/load-posts",
      parentId: "routes/feed/$feedId",
      path: "load-posts",
      index: void 0,
      caseSensitive: void 0,
      module: load_posts_exports,
    },
    "routes/invite/index": {
      id: "routes/invite/index",
      parentId: "root",
      path: "invite",
      index: !0,
      caseSensitive: void 0,
      module: invite_exports,
    },
    "routes/logout/index": {
      id: "routes/logout/index",
      parentId: "root",
      path: "logout",
      index: !0,
      caseSensitive: void 0,
      module: logout_exports,
    },
    "routes/post/$postId": {
      id: "routes/post/$postId",
      parentId: "root",
      path: "post/:postId",
      index: void 0,
      caseSensitive: void 0,
      module: postId_exports,
    },
    "routes/post/$postId/create-comment": {
      id: "routes/post/$postId/create-comment",
      parentId: "routes/post/$postId",
      path: "create-comment",
      index: void 0,
      caseSensitive: void 0,
      module: create_comment_exports,
    },
    "routes/post/$postId/load-comments": {
      id: "routes/post/$postId/load-comments",
      parentId: "routes/post/$postId",
      path: "load-comments",
      index: void 0,
      caseSensitive: void 0,
      module: load_comments_exports,
    },
    "routes/post/$postId/post-utils": {
      id: "routes/post/$postId/post-utils",
      parentId: "routes/post/$postId",
      path: "post-utils",
      index: void 0,
      caseSensitive: void 0,
      module: post_utils_exports,
    },
    "routes/user/$userId": {
      id: "routes/user/$userId",
      parentId: "root",
      path: "user/:userId",
      index: void 0,
      caseSensitive: void 0,
      module: userId_exports,
    },
    "routes/user/$userId/comments": {
      id: "routes/user/$userId/comments",
      parentId: "routes/user/$userId",
      path: "comments",
      index: void 0,
      caseSensitive: void 0,
      module: comments_exports,
    },
    "routes/user/$userId/index": {
      id: "routes/user/$userId/index",
      parentId: "routes/user/$userId",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: userId_exports2,
    },
    "routes/user/$userId/posts": {
      id: "routes/user/$userId/posts",
      parentId: "routes/user/$userId",
      path: "posts",
      index: void 0,
      caseSensitive: void 0,
      module: posts_exports,
    },
    "routes/login/index": {
      id: "routes/login/index",
      parentId: "root",
      path: "login",
      index: !0,
      caseSensitive: void 0,
      module: login_exports,
    },
    "routes/users/index": {
      id: "routes/users/index",
      parentId: "root",
      path: "users",
      index: !0,
      caseSensitive: void 0,
      module: users_exports,
    },
    "routes/feed/types": {
      id: "routes/feed/types",
      parentId: "root",
      path: "feed/types",
      index: void 0,
      caseSensitive: void 0,
      module: types_exports,
    },
    "routes/admin": {
      id: "routes/admin",
      parentId: "root",
      path: "admin",
      index: void 0,
      caseSensitive: void 0,
      module: admin_exports,
    },
    "routes/admin/tenants/index": {
      id: "routes/admin/tenants/index",
      parentId: "routes/admin",
      path: "tenants",
      index: !0,
      caseSensitive: void 0,
      module: tenants_exports,
    },
    "routes/admin/users": {
      id: "routes/admin/users",
      parentId: "routes/admin",
      path: "users",
      index: void 0,
      caseSensitive: void 0,
      module: users_exports2,
    },
    "routes/admin/users/$userId/tenants": {
      id: "routes/admin/users/$userId/tenants",
      parentId: "routes/admin/users",
      path: ":userId/tenants",
      index: void 0,
      caseSensitive: void 0,
      module: tenants_exports2,
    },
    "routes/feeds": {
      id: "routes/feeds",
      parentId: "root",
      path: "feeds",
      index: void 0,
      caseSensitive: void 0,
      module: feeds_exports,
    },
    "routes/feeds/create": {
      id: "routes/feeds/create",
      parentId: "routes/feeds",
      path: "create",
      index: void 0,
      caseSensitive: void 0,
      module: create_exports2,
    },
    "routes/index": {
      id: "routes/index",
      parentId: "root",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: routes_exports,
    },
  };
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    assets,
    assetsBuildDirectory,
    entry,
    publicPath,
    routes,
  });
//# sourceMappingURL=index.js.map
