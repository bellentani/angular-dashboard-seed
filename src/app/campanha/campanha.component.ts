import { CampanhaFilter } from './campanha.filter';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Campanha } from './campanha';
import { CampanhaService } from './campanha.service';

@Component({
    selector: 'campanha',
    templateUrl: './campanha.component.html',
    providers: [CampanhaService],
})
export class CampanhaComponent implements OnInit {

    @ViewChild('createModal') public createModal: ModalDirective;
    @ViewChild('deleteModal') public deleteModal: ModalDirective;

    collectionCampanha: Campanha[];
    model = new Campanha();
    filter = new CampanhaFilter();

    constructor(private api: CampanhaService) { 
        this.api.setResource();
    }

    ngOnInit() {
        this.Load();
    }

    Load(filters?: CampanhaFilter) {
        this.api.Get(filters).subscribe(data => this.collectionCampanha = data.DataList);
    }

    Filter(){
        this.Load(this.filter);
    }

    ConfirmSave() {
        this.api.Post(this.model).subscribe(data => this.onCreate(data));
    }

    ConfirmDelete() {
        this.api.Delete(this.model).subscribe(data => this.onDelete(data));
    }

    onCreate(data) {
        this.createModal.hide();
        this.Load();
    }

    onDelete(data) {
        this.createModal.hide();
        this.Load();
    }

    edit(id) {
        const filters = new CampanhaFilter();
        filters.Id = id;
        this.api.Get(filters).subscribe(data => this.openModal(data.Data));
    }

    delete(data: Campanha) {
        this.model = data;
        this.deleteModal.show();
    }

    openModal(data: Campanha) {
        this.model = data;
        this.createModal.show();
    }

}
