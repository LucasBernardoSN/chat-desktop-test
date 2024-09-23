# Guia de Configuração Para _Production_ Desktop ElectronJS

## 1️⃣ - Básico

- Copiar a pasta **_src_** do projeto web

- Substituir a pasta **_src_** do projeto **_desktop_** com a pasta copiada anteriormente

- Substituir o arquivo **_vite-env.d.ts_** dentro nova pasta **_src_** pelo arquivo **_react-app-env.d.ts_** presente na raiz do projeto

&nbsp;

## 2️⃣ - Configurar o tipo de aplicação

Em `src/services/config/index.ts`

Substituir

```javascript
const device = 'web'
```

Por

```javascript
const device = 'application'
```

&nbsp;

## 3️⃣ - Piscar quando chega nova mensagem

Em `src/services/socket/useSocketHandler.ts`

Inserir abaixo de: `export const useSocketHandler = () => {`

O seguinte código:

```javascript
const app = window.require('electron');
const ipcRenderer = app.ipcRenderer;
```

Resultado

```javascript
export const useSocketHandler = () => {
const app = window.require('electron');
const ipcRenderer = app.ipcRenderer;
```

&nbsp;

Inserir abaixo de: `if (newMessageList.length) {`

O seguinte código:

```javascript
ipcRenderer.send('newMessage')
```

Resultado

```javascript
if (newMessageList.length) {
ipcRenderer.send('newMessage')
```

Em `src/views/ChatScreen/index.tsx`

Inserir abaixo de: `export default function ChatScreen() {`

O seguinte código:

```javascript
const app = window.require('electron');
const ipcRenderer = app.ipcRenderer;
```

Resultado

```javascript
export default function ChatScreen() {
const app = window.require('electron');
const ipcRenderer = app.ipcRenderer;
```

Inserir em `userValidationAndStartup`  abaixo de:

```javascript
for (const chatElement of data) {
  dispatch(
    setChatList( 
        await createChatElement(chatElement)
    )
  );
}
```

O seguinte código:

```javascript
ipcRenderer.send('newMessage')
```

Resultado

```javascript
for (const chatElement of data) {
  dispatch(
    setChatList( 
        await createChatElement(chatElement)
    )
  );
}
ipcRenderer.send('newMessage')
```

&nbsp;

## 4️⃣ - Contar mensagens não lidas no ícone

Em `src/reducers/ChatList.reducer.ts`

```javascript
const app = window.require('electron');
const ipcRenderer = app.ipcRenderer;
```

Inserir no final de `updateMessageCount`

O seguinte código:

```javascript
const chatList = Object.values(state);
let messageCount = 0;
for (const chatItem of chatList) {
  messageCount = messageCount + chatItem.messagecount
};
ipcRenderer.sendSync('update-badge', messageCount <= 0 ? null : messageCount);
```

Em `src/views/ChatScreen/index.tsx`

Inserir em `userValidationAndStartup`  abaixo de:

```javascript
for (const chatElement of data) {
  dispatch(
    setChatList( await createChatElement(chatElement))
  )
}
```

O seguinte código:

```javascript
let messageCount = 0
for (const chatItem of data) {
  messageCount = messageCount + chatItem.messagecount
}
ipcRenderer.sendSync('update-badge', messageCount <= 0 ? null : messageCount);
```

Resultado

```javascript
for (const chatElement of data) {
  dispatch(
    setChatList( await createChatElement(chatElement))
  )
}

let messageCount = 0
for (const chatItem of data) {
  messageCount = messageCount + chatItem.messagecount
}
ipcRenderer.sendSync('update-badge', messageCount <= 0 ? null : messageCount);
```

&nbsp;

## 5️⃣ - Atualização

Em `package.json`

- Atualizar a versão do chat para à correspondente

Em `src/services/config/index.ts`

- Se necessário, modificar o estado de desenvolvimento para produção

Substituir:

```javascript
const DEV: boolean = true;
```

Por:

```javascript
const DEV: boolean = false;
```

Em `src/components/ChatHome/index.ts`

Modificar as notas de atualização para o conteúdo correspondente
