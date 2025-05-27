import { Client } from '../plugins/membase/hub';

async function main() {
    // Initialize client
    const hubUrl = 'https://testnet.hub.membase.io';
    const client = new Client(hubUrl);

    // User identifier
    const owner = 'eliza_test_user';
    const agent_name = 'eliza_test_agent';
    const conversationId = 'eliza_test_conversation';

    // Get conversation, result is an array of messages
    const conversation = await client.getConversation(owner, conversationId);
    console.log('Conversation:', conversation);

    const conversationLength = conversation.length;
    console.log('Conversation length:', conversationLength);

    // Check if conversation is an array and has messages
    if (Array.isArray(conversation)) {
        // If conversation is directly an array of messages
        console.log('Conversation length:', conversation.length);

        // Print first message if available
        if (conversation.length > 0) {
            console.log('First message:', conversation[0]);
        }
    } else {
        console.log('Conversation format is unexpected:', conversation);
    }

    // 1. Upload examples
    console.log('\n--- Upload File Examples ---');

    // 1.1 Using uploadHub to upload file information
    // messageID is the conversationId + "_" + conversationLength
    const messageID = conversationId + "_" + conversationLength;
    // change msg into json string
    const msg = JSON.stringify({
        "content": 'This is an example file',
        "name": agent_name,
        "metadata": {
            "conversation": conversationId,
        }
    });
    const uploadResult = await client.uploadHub(
        owner,
        messageID,
        msg,
        true // Wait for upload to complete
    );
    console.log('File information upload result:', uploadResult);

    // 2. Download examples
    console.log('\n--- Download File Examples ---');
    try {
        const downloadedData = await client.downloadHub(owner, messageID);
        if (downloadedData) {
            console.log('Downloaded file content:', downloadedData.toString());
        } else {
            console.log('Download failed or file does not exist');
        }
    } catch (error) {
        console.error('Failed to download file:', error);
    }

    // 3. Conversation management examples
    console.log('\n--- Conversation Management Examples ---');

    // 3.1 List conversations
    try {
        const conversations = await client.listConversations(owner);
        console.log('User conversation list:', conversations);

        // If conversations exist, get details of the first one
        if (conversations && conversations.length > 0) {
            const conversationId = conversations[0]; // Assuming the returned structure contains an ID field

            // 3.2 Get specific conversation details
            const conversationDetails = await client.getConversation(owner, conversationId);
            console.log(`Details for conversation ${conversationId}:`, conversationDetails);
        } else {
            console.log('No conversations found');
        }
    } catch (error) {
        console.error('Failed to get conversation information:', error);
    }

    // Wait for all upload tasks to complete
    await client.waitForUploadQueue();
    console.log('All upload tasks completed');
}

// Run the example
main().catch(error => {
    console.error('Example execution failed:', error);
}); 