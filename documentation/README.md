[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![Release](https://github.com/berviantoleo/react-multi-crop/workflows/Release/badge.svg)

# React Multi Crop

Easy and extensible react component to crop as multiple image

::: tip
Explore components <a href="components/">here</a>
:::

## Table of Content

[[toc]]

## How to Use

### in react-admin

```jsx
import { ReactMultiCrop } from '@berviantoleo/react-multi-crop';
import { Field } from 'redux-form';

<SimpleForm>
...
<Field name="my_field" component={ReactMultiCrop} />
...
</SimpleForm>
```

### in react-admin depend on another field for image showing

```jsx
import { ReactMultiCrop } from '@berviantoleo/react-multi-crop';
import { Field, formValues } from 'redux-form';
<SimpleForm>
...
<Field name="image" component={ImageField} />
<Field name="my_field" component={formValues('image')(ReactMultiCrop)} />
...
</SimpleForm>
```

### another sample

[Codesandbox.io](https://codesandbox.io/s/react-crop-demo-9hjxs)

## Feature

1. Input, basically no need any input, but in `react-admin`, we provide to read `record.image` field, if you need another field, you should update the code, also in `redux-form`, we also provide to read `image` prop. That prop will show an image in a canvas that will be used for croping.
2. Output, basically this output will stored in redux-form and can be sent into your API.
3. Keyboard event, `delete` will delete your current pointing (active) of box-crop.
4. Mouse event, `double click` into box-crop will duplicate your box-crop.
5. Also there are some action in button that can be used, add shape (box-crop), delete selected object (box-crop), select all (box-crop), and discard current active selection (box-crop).

## NOTICE

ReactMultiCrop component may very spesific to build and support react-admin. But also compatible with redux-form.

## LICENSE

MIT
```md
MIT License

Copyright (c) 2020 Bervianto Leo Pratama

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contact Person

Email: bervianto.leo@gmail.com



