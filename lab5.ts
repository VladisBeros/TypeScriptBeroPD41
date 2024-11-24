interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
}

interface Article extends BaseContent {
    title: string;
    body: string;
    author: string;
    tags: string[];
}
  
interface Product extends BaseContent {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}
  
type ContentOperations<T extends BaseContent> = {
    create: (content: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => T;
    read: (id: string) => T | null;
    update: (id: string, content: Partial<T>) => T | null;
    delete: (id: string) => boolean;
    list: () => T[];
};
  
type Role = 'admin' | 'editor' | 'viewer';
  
type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};
  
type AccessControl<T extends BaseContent> = {
    role: Role;
    permissions: Permission;
    contentType: { new (): T };
};
  
type Validator<T> = {
    validate: (data: T) => ValidationResult;
};
  
type ValidationResult = {
    isValid: boolean;
    errors?: string[];
};
  
const ArticleValidator: Validator<Article> = {
    validate: (data) => {
      const errors: string[] = [];
      if (!data.title || data.title.length < 5) {
        errors.push('Заголовок має бути не менше 5 символів.');
      }
      if (!data.body) {
        errors.push('Тіло не може бути порожнім.');
      }
      return {
        isValid: errors.length === 0,
        errors,
      };
    },
};
  
const ProductValidator: Validator<Product> = {
    validate: (data) => {
      const errors: string[] = [];
      if (data.price <= 0) {
        errors.push('Ціна має бути більше 0.');
      }
      if (data.stock < 0) {
        errors.push('Запас не може бути від’ємним.');
      }
      return {
        isValid: errors.length === 0,
        errors,
      };
    },
};
  
type Versioned<T extends BaseContent> = T & {
    version: number;
    history: T[];
};
  
const articleOperations: ContentOperations<Article> = {
    create: (content) => ({
      ...content,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
    }),
    read: (id) => null,
    update: (id, content) => null,
    delete: (id) => true,
    list: () => [],
};
