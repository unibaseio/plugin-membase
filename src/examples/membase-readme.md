# Membase Hub Client Usage Guide

This example demonstrates how to use the Membase Hub client for file uploads, downloads, and conversation management.

## Feature Overview

1. **File Upload**
   - Upload file information (`uploadHub`)
   - Upload file content (`uploadHubData`)

2. **File Download**
   - Download files from server (`downloadHub`)

3. **Conversation Management**
   - Get conversation list (`listConversations`)
   - Get specific conversation details (`getConversation`)

## How to Run the Example

1. First, ensure all dependencies are installed:
   ```
   npm install
   ```

2. Modify the `hubUrl` in `membase-example.ts` to your Membase server address

3. Run the example:
   ```
   npx ts-node src/examples/membase-example.ts
   ```

## Code Explanation

### Client Initialization

```typescript
const hubUrl = 'https://your-membase-server.com';
const client = new Client(hubUrl);
```

### File Upload

```typescript
// Upload file information
const uploadResult = await client.uploadHub(
  owner,
  'example-file.txt',
  '这是一个示例文件',
  true // Wait for upload to complete
);

// Upload file content
const fileData = Buffer.from('这是示例文件的内容');
const dataUploadResult = await client.uploadHubData(
  owner,
  'example-data.txt',
  fileData
);
```

### File Download

```typescript
const downloadedData = await client.downloadHub(owner, 'example-data.txt');
if (downloadedData) {
  // Save downloaded content to local file
  await fs.writeFile(path.join(__dirname, 'downloaded-file.txt'), downloadedData);
}
```

### Conversation Management

```typescript
// Get conversation list
const conversations = await client.listConversations(owner);

// Get specific conversation details
const conversationDetails = await client.getConversation(owner, conversationId);
```

## Important Notes

- Ensure the server URL is correctly configured before use
- For large files, it's recommended to use the `uploadHubData` method
- All operations return Promises, which can be used with async/await or chained with then()
- Use `waitForUploadQueue()` to ensure all upload tasks are completed 