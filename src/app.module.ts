import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import AdminJS from 'adminjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Organization } from './organizations/organization.entity';
import { Article } from './articles/article.entity';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'vizzuality',
      password: 'vizz',
      database: 'vizzuality',
      entities: [User, Organization, Article],
      synchronize: true,
    }),
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          locale: {
            language: 'es',
            translations: {
              actions: {
                new: 'Stwórz nowy',
                edit: 'Edytuj',
                show: 'Detale',
              },
              buttons: {
                save: 'zapisz',
                // We use i18next with its pluralization logic.
                confirmRemovalMany_1: 'Potwierdź usunięcie {{count}} rekordu',
                confirmRemovalMany_2: 'Potwierdź usunięcie {{count}} rekordów',
              },
            },
          },
          rootPath: '/admin',
          resources: [
            {
              resource: User,
              options: {
                properties: {
                  email: {
                    isVisible: {
                      edit: true,
                      show: true,
                      list: false,
                      filter: false,
                    },
                  },
                },
              },
            },
            Organization,
            {
              resource: Article,
              options: {
                properties: {
                  content: {
                    type: 'richtext',
                    custom: {
                      modules: {
                        toolbar: [
                          ['bold', 'italic'],
                          ['link', 'image'],
                        ],
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
