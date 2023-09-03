import { AxiosError } from 'axios';

type ApiError = AxiosError<ErrorResponse>;

const isApiError = (err: ApiError | unknown): err is ApiError => {
  return (err as ApiError).response !== undefined;
};

export const isError = (err: Error | unknown): err is Error => {
  return (err as Error) !== undefined;
};

export const getApiErrors = (errors: ApiError | Error | unknown): string => {
  if (isApiError(errors)) {
    const { response } = errors;
    
    if (response && response.data && response.data.errors) {
      const messages: string[] = [];
      console.log(response.data.errors)
      if (Array.isArray(response.data.errors)) {
        response.data.errors.forEach(error => messages.push(error.message));
      return messages.join('\n');
      }else{
        return 'Ocorreu um erro não previsto, favor contatar o suporte.'
      }
    }

    return '';
  }

  if (isError(errors)) {
    return errors.message;
  }

  return '';
};


export interface ErrorResponse {
  message: string;
  errors: FieldErrorResponse[];
}

export interface FieldErrorResponse {
  code?: string;
  field: string;
  message: string;
}
