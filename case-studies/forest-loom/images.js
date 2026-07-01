// Local photography map for Forest & Loom.
const core = (name) => `/case-studies/forest-loom/core/${name}.jpg`;
const product = (name) => `/case-studies/forest-loom/products/${name}.jpg`;
const productVariant = (name) => `/case-studies/forest-loom/products/variants/${name}.jpg`;
const detail = (name) => `/case-studies/forest-loom/details/${name}.jpg`;
const maker = (name) => `/case-studies/forest-loom/makers/${name}.jpg`;
const category = (name) => `/case-studies/forest-loom/categories/${name}.jpg`;

export const IMG = {
  // cinematic editorial (warm, moody)
  heroMain: core('hero-main-v1'),
  heroAlt: core('hero-alt-v1'),
  heroC: core('hero-c-v1'),
  heroD: core('hero-d-v1'),
  lookMain: core('look-main-v1'),
  craftMain: core('craft-main-v1'),
  roomMain: core('room-main-v1'),
  closingMain: core('closing-main-v1'),

  // categories (referenced by data; not rendered as tiles in the current home)
  catThrows: category('throws-cover-v1'),
  catWearables: category('wearables-cover-v1'),
  catHome: category('home-cover-v1'),

  // products
  pKora: product('kora-throw-v1'),
  pKhes: product('indigo-khes-v1'),
  pStole: product('maheshwari-stole-v1'),
  pScarf: product('tussar-scarf-v1'),
  pWrap: product('kutch-wool-wrap-v1'),
  pNapkins: product('selvedge-napkins-v1'),
  pRunner: product('indigo-table-runner-v1'),
  pCushion: product('bhujodi-cushion-v1'),
  pKoraAlt1: productVariant('kora-throw-alt-1'),
  pKoraAlt2: productVariant('kora-throw-alt-2'),
  pKhesAlt1: productVariant('indigo-khes-alt-1'),
  pKhesAlt2: productVariant('indigo-khes-alt-2'),
  pStoleAlt1: productVariant('maheshwari-stole-alt-1'),
  pStoleAlt2: productVariant('maheshwari-stole-alt-2'),
  pScarfAlt1: productVariant('tussar-scarf-alt-1'),
  pScarfAlt2: productVariant('tussar-scarf-alt-2'),
  pWrapAlt1: productVariant('kutch-wool-wrap-alt-1'),
  pWrapAlt2: productVariant('kutch-wool-wrap-alt-2'),
  pNapkinsAlt1: productVariant('selvedge-napkins-alt-1'),
  pNapkinsAlt2: productVariant('selvedge-napkins-alt-2'),
  pRunnerAlt1: productVariant('indigo-table-runner-alt-1'),
  pRunnerAlt2: productVariant('indigo-table-runner-alt-2'),
  pCushionAlt1: productVariant('bhujodi-cushion-alt-1'),
  pCushionAlt2: productVariant('bhujodi-cushion-alt-2'),

  // makers
  maker1: maker('bhujodi-vankars-v1'),
  maker2: maker('rehman-master-dyer-v1'),

  // product-detail gallery supporting shots
  detailMacro: detail('detail-macro-v1'),
  foldedStack: detail('folded-stack-v1'),
};
