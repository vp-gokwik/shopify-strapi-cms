import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCollection extends Struct.ComponentSchema {
  collectionName: 'components_shared_collections';
  info: {
    displayName: 'Collection';
    icon: 'bulletList';
  };
  attributes: {
    collectionid: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String;
  };
}

export interface SharedCouponItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_coupon_items';
  info: {
    displayName: 'CouponItem';
    icon: 'crown';
  };
  attributes: {
    body: Schema.Attribute.String & Schema.Attribute.Required;
    code: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedImageBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_banners';
  info: {
    displayName: 'imageBanner';
    icon: 'picture';
  };
  attributes: {
    src: Schema.Attribute.Media<'images' | 'files'>;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'imageBanner'>;
    url: Schema.Attribute.String;
  };
}

export interface SharedPageItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_items';
  info: {
    displayName: 'PageItem';
    icon: 'bulletList';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['imageBanner', 'offerTimer', 'collection']
    >;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.collection': SharedCollection;
      'shared.coupon-item': SharedCouponItem;
      'shared.image-banner': SharedImageBanner;
      'shared.page-item': SharedPageItem;
    }
  }
}
