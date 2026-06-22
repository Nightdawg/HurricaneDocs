# Troubleshooting & FAQ

## The updater won't run

1. Confirm your Java version is between **17 and 21** (**21 recommended**).
2. Add `HurricaneUpdater.jar` to your anti-virus exceptions list.

## The client won't launch

1. Confirm your Java version is between **17 and 21** (**21 recommended**).
2. Add `Play.bat` (or `Play_Linux.sh`) to your anti-virus exceptions list.

## How do I check my Java version?

Open a terminal / command prompt and run:

```bash
java -version
```

If it reports something outside the 17-21 range, install a supported JDK (Java **21**
recommended, or GraalVM 21 for extra FPS).

## Does Hurricane send my data anywhere?

No. The client only communicates with the official **Seatribe** server, unless you
explicitly configure an optional integration (such as a private map server or the
cookbook integration).

## Optional integrations

- **Private web-map server** - supports [Cediner's hnh-map](https://github.com/Cediner/hnh-map-vuetify)
  or [dafels' mapping service](https://www.havenandhearth.com/forum/viewtopic.php?f=49&t=79701).
- **Cookbook integration** (disabled by default) - use a public cookbook token or host
  your own (e.g. [hnh-food-book](https://github.com/Cediner/hnh-food-book)).

## Where can I get help?

- 💬 [Discord Server](https://discord.gg/7Ct4t6uME6)
- 🧵 [Forum Thread](https://www.havenandhearth.com/forum/viewtopic.php?t=76544)
