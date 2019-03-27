import { DocumentQuery, Document } from 'mongoose';
import { AppError } from 'src/common/error/AppError';
import { SelectorDTO } from '../../dto/selector.dto';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export abstract class Selector<T extends Document> {
    public abstract GetName(): string;

    public ApplySelectorDTO = (
        selectorDTO: SelectorDTO,
        currentQuery: DocumentQuery<T[], T, {}>,
        ): DocumentQuery<T[], T, {}> => {
        this.ValidateSelectorName(selectorDTO);
        this.ValidateSelectorDTO(selectorDTO);
        return this.ApplyValidatedSelectorDTO(selectorDTO, currentQuery);
    }

    protected abstract ApplyValidatedSelectorDTO(
        selectorDTO: SelectorDTO,
        currentQuery: DocumentQuery<T[], T, {}>,
        ): DocumentQuery<T[], T, {}>;

    protected abstract ValidateSelectorDTO(selectorDTO: SelectorDTO): void;

    private ValidateSelectorName(selectorDTO: SelectorDTO): void {
        if (selectorDTO.Name !== this.GetName()) {
            throw new BadRequestException(
                'Invalid selector name:' +
                selectorDTO.Name + '!==' +
                this.GetName());
        }
    }

    // utility
    protected ThrowValidationErr(message: string): void {
        throw new BadRequestException(message);
    }
}
