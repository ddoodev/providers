<p align="center">
<a href="https://docs.discordoo.xyz/"><img width="520" src="https://cdn.discordapp.com/attachments/531549268033404928/890940118804873256/ddoologo_new_1_banner_providers.svg" alt=""></a>
</p>

<p align="center">
  <b>
    Discord bots. Simplified and boosted
    <span> · </span>
    <a href="https://docs.discordoo.xyz/providers">Docs</a>
    <span> · </span>
    <a href="https://github.com/Discordoo/guide/blob/develop/CONTRIBUTING.md">Contribute</a>
  </b>
</p>

<p align="center">
  <a href="https://discord.gg/eHC8ynn2H3">
    <img 
      src="https://img.shields.io/discord/811663819721539674?color=7280DA&label=Discord&logo=discord&logoColor=white" 
      alt="Online"
    >
  </a>
</p>
<hr>

# Providers
Repository for interfaces that must be implemented by custom providers for Discordoo (typescript only).

## How to use
```sh
npm i @discordoo/providers
```

### Example with cache provider
```ts
import { CacheProvider } from '@discordoo/providers'

class CustomCacheProvider implements CacheProvider {
  constructor(client/*, some, options, for, cache, provider*/) {}
}
```
```ts
import { createApp, DefaultClientStack } from 'discordoo'
import { CustomCacheProvider } from 'your-custom-cache-provider'

interface CustomClientStack extends DefaultClientStack {
  cache: CustomCacheProvider
}

const client = createApp<CustomClientStack>('discord-bot-token')
  .cacheProvider(CustomCacheProvider/*, some, options, for, cache, provider*/)
  .build()

client.internals.cache.provider.somethingCustom()
```
### Example with gateway provider and custom events
```ts
import { GatewayProvider } from '@discordoo/providers'

class CustomGatewayProvider implements GatewayProvider {}

interface Command {
  oh: boolean
}

interface CustomClientEvents {
  slashCommand: (command: Command) => unknown
}
```
```ts
import { createApp, DefaultClientStack } from 'discordoo'
import { CustomGatewayProvider, CustomClientEvents } from 'your-custom-gateway-provider'

interface CustomClientStack extends DefaultClientStack {
  gateway: CustomGatewayProvider
  events: CustomClientEvents // overrides default client events
}

const client = createApp<CustomClientStack>('discord-bot-token')
  .gatewayProvider(CustomGatewayProvider)
  .build()

client.on('slashCommand', command => { // automatically detects the Command type
  let oh = command.oh
  oh = 'true' // Error: Type 'string' is not assignable to type 'boolean'.
})
```
