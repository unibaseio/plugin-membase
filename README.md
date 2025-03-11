# @elizaos/plugin-membase

A plugin for storing memory using the membase protocol within the ElizaOS ecosystem.

## Description

The membase plugin enables seamless integration with the Membase protocol for decentralized storage. It provides functionality to upload memory to the Unibase DA network.

## Installation

```bash
pnpm install @elizaos/plugin-membase
```

## Configuration

The plugin requires the following environment variables to be set:

```typescript
MEMBASE_HUB=<Membase hub endpoint>
MEMBASE_ACCOUNT=<Membase account address>
```

## Usage

### Basic Integration

```typescript
import { mPlugin } from "@elizaos/plugin-membase";
```

### Message Upload Example

```typescript
// The plugin automatically handles memory uploads when triggered
// through natural language commands like:

"save mesage in membase";
"store memory on membase";
```

## API Reference

### Actions

#### MMEBASE_UPLOAD

Uploads message to membase.

**Aliases:**

- UPLOAD_MEMORY_TO_MEMBASE
- STORE_MEMORY_ON_MEMBASE
- SAVE_MMEORY_TO_MEMBASE
- PUBLISH_MEMORY_TO_MEMBASE
- UPLOAD_MESSAGE_TO_MEMBASE
- STORE_MESSAGE_ON_MEMBASE
- SAVE_MESSAGE_TO_MEMBASE
- PUBLISH_MESSAGE_TO_MEMBASE

````

## Development Guide

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
````

3. Build the plugin:

```bash
pnpm run build
```

4. Run the plugin:

```bash
pnpm run dev
```

5. Run the project using the 'direct' client:

```bash
pnpm exec node --loader ts-node/esm ./src/scripts/load-with-plugin.ts --characters=./characters/eternalai.character.json
```

## Future Enhancements

1. **Converation Management**

   - Converation switch
   - Conversation preload at startup

2. **Data Security**

   - Enhanced encryption options
   - Access control lists

We welcome community feedback and contributions to help prioritize these enhancements.

## License

This plugin is part of the Eliza project. See the main project repository for license information.
