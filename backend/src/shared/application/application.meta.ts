import { Result } from '../core/entities';

export interface IApplication {
    execute(viewModel: any): Promise<Result>;
}
