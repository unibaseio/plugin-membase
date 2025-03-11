import { describe, it, expect, beforeEach } from 'vitest';
import { Client } from '../../src/plugins/membase/hub.ts';
import { mUpload } from '../../src/plugins/membase/upload.ts';
import type { Memory, IAgentRuntime, State } from '@elizaos/core';

// Mock State type implementation
const createMockState = (): State => ({
    bio: '',
    lore: '',
    messageDirections: '',
    postDirections: '',
    recentMessages: '',
    recentMessagesData: [],
    currentMessage: null,
    context: {},
    memory: '',
    roomId: '12345678-1234-1234-1234-123456789012',
    actors: ''
});

describe('Client', () => {
    let client: Client;
    const baseUrl = 'https://testnet.hub.membase.io';

    beforeEach(() => {
        client = new Client(baseUrl);
    });

    describe('uploadHub', () => {
        it('should upload data successfully with wait=true', async () => {
            const owner = 'eliza_test_user';
            const filename = 'eliza_test_message_' + Date.now();
            const msg = 'test message';

            const resultPromise = client.uploadHub(owner, filename, msg, true);

            // Wait a bit for the queue to process
            await new Promise(resolve => setTimeout(resolve, 200));

            const result = await resultPromise;
            expect(result).toEqual({
                status: 'completed',
                message: 'Upload task completed'
            });
        });

        it('should return queued status when wait=false', async () => {
            const result = await client.uploadHub('eliza_test_user', 'eliza_test_message_' + Date.now(), 'test message', false);
            expect(result).toEqual({
                status: 'queued',
                message: 'Upload task has been queued'
            });
        });
    });
});

describe('mUpload Action', () => {
    let mockRuntime: IAgentRuntime;
    let mockMessage: Memory;
    let mockState: State;

    beforeEach(() => {
        mockRuntime = {
            getSetting: (key: string) => {
                const settings: Record<string, string> = {
                    'MEMBASE_HUB': 'https://testnet.hub.membase.io',
                    'MEMBASE_ACCOUNT': 'eliza_test_user',
                };
                return settings[key] || '';
            },
            composeState: async () => createMockState(),
            updateRecentMessageState: async (state) => state
        } as unknown as IAgentRuntime;

        // Create a UUID-like id for the test message
        const testId = '12345678-1234-1234-1234-123456789012';

        mockMessage = {
            id: testId,
            userId: 'eliza_test_user',
            agentId: 'eliza_test_agent',
            roomId: 'eliza_test_room',
            content: {
                text: 'test message',
                filePath: '/path/to/file.pdf'
            }
        } as unknown as Memory;

        mockState = createMockState();
    });

    describe('validate', () => {
        it('should validate successfully with all required settings', async () => {
            const result = await mUpload.validate(mockRuntime, mockMessage);
            expect(result).toBe(true);
        });

        it('should fail validation when settings are missing', async () => {
            mockRuntime.getSetting = () => '';
            const result = await mUpload.validate(mockRuntime, mockMessage);
            expect(result).toBe(false);
        });
    });

    describe('handler', () => {
        it('should handle upload successfully with new state', async () => {
            const result = await mUpload.handler(mockRuntime, mockMessage, undefined);
            expect(result).not.toBe(false);
        });

        it('should handle upload successfully with existing state', async () => {
            const result = await mUpload.handler(mockRuntime, mockMessage, mockState);
            expect(result).not.toBe(false);
        });
    });
});
