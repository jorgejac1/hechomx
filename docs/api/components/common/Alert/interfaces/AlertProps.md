[**Papalote Market API v1.0.0**](../../../../README.md)

---

[Papalote Market API](../../../../README.md) / [components/common/Alert](../README.md) / AlertProps

# Interface: AlertProps

Defined in: [components/common/Alert.tsx:27](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L27)

Props for the Alert component
AlertProps

## Properties

### actions?

> `optional` **actions**: `ReactNode`

Defined in: [components/common/Alert.tsx:47](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L47)

Action buttons or links to render at the bottom

---

### children

> **children**: `ReactNode`

Defined in: [components/common/Alert.tsx:35](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L35)

Main content/description of the alert

---

### className?

> `optional` **className**: `string`

Defined in: [components/common/Alert.tsx:45](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L45)

Additional CSS classes

---

### dismissible?

> `optional` **dismissible**: `boolean`

Defined in: [components/common/Alert.tsx:41](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L41)

Whether to show a dismiss/close button

---

### hideIcon?

> `optional` **hideIcon**: `boolean`

Defined in: [components/common/Alert.tsx:39](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L39)

Whether to hide the icon completely

---

### icon?

> `optional` **icon**: `LucideIcon`

Defined in: [components/common/Alert.tsx:37](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L37)

Custom icon component - overrides the default variant icon

---

### layout?

> `optional` **layout**: [`AlertLayout`](../type-aliases/AlertLayout.md)

Defined in: [components/common/Alert.tsx:31](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L31)

Layout style: default (full border), bordered (rounded with border), sidebar (left accent border)

---

### onDismiss()?

> `optional` **onDismiss**: () => `void`

Defined in: [components/common/Alert.tsx:43](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L43)

Callback fired when the dismiss button is clicked

#### Returns

`void`

---

### title?

> `optional` **title**: `string`

Defined in: [components/common/Alert.tsx:33](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L33)

Optional title displayed in bold above the content

---

### variant?

> `optional` **variant**: [`AlertVariant`](../type-aliases/AlertVariant.md)

Defined in: [components/common/Alert.tsx:29](https://github.com/jorgejac1/hechomx/blob/main/components/common/Alert.tsx#L29)

Color variant - determines the alert's color scheme and default icon
