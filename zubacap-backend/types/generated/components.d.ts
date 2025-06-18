import type { Schema, Struct } from '@strapi/strapi';

export interface PerfilDocumento extends Struct.ComponentSchema {
  collectionName: 'components_perfil_documentos';
  info: {
    displayName: 'Documento';
    icon: 'file';
  };
  attributes: {
    archivo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    fechaCaducidad: Schema.Attribute.Date;
    nombreDocumento: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TestAlternativa extends Struct.ComponentSchema {
  collectionName: 'components_test_alternativas';
  info: {
    displayName: 'Alternativa';
    icon: 'bulletList';
  };
  attributes: {
    esCorrecta: Schema.Attribute.Boolean & Schema.Attribute.Required;
    Texto: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'perfil.documento': PerfilDocumento;
      'test.alternativa': TestAlternativa;
    }
  }
}
