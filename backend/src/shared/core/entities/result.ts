export interface ResultError {
    code: number;
    message: string;
}

export class Result {
    private errors: ResultError[] = [];
    data = null;
    msg: string;

    constructor(data?: any) {
        if (typeof data !== 'undefined') {
            this.data = data;
        }
    }

    addError(error: string | Error, code = 400) {
        if (error instanceof Error) {
            this.errors.push({ code: 500, message: 'Internal server error' });
        }
        else {
            const message = error as string;
            this.errors.push({ code, message });
        }
    }

    getErrors() {
        return this.errors;
    }

    getErrorMessages() {
        return this.errors.map(error => error.message);
    }

    getMessage() {
        if (this.msg) {
            return this.msg;
        }
        else if (this.hasErrors()) {
            let errors = this.getErrorMessages();

            return errors.join(', ');
        }
        else {
            return '';
        }
    }

    getStatusCode() {
        let code = 200;

        if (this.hasErrors()) {
            code = 400;

            for (let i = 0; i < this.errors.length; i++) {
                if (this.errors[i].code >= code) {
                    code = this.errors[i].code;
                }
            }
        }

        return code;
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    clearErrors() {
        this.errors = [];
    }
}
