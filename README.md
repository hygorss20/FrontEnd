# Yanlili Website

## Development guides

### Production enviroment

The files `src/environments/environment.prod.ts` and `src/index.prod.html` are a replacement for `src/environments/environment.ts` and `src/index.html`.

So, the original files are replaced by `.prod` version when the app is built with `--prod` flag. Any changes in `environment.ts` and `index.html` should be mirrored in `.prod` versions.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

