import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Player, PlayerService} from '../player.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  playerForm: FormGroup;

  @Input() public player: Player = {name: '', image: ''};

  @Input() public editing = false;

  @Output() passPlayer: EventEmitter<any> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl(this.player.name, Validators.required),
      image: new FormControl(this.player.image)
    });
  }

  passBack() {
    this.player.name = this.playerForm.controls.name.value;
    this.player.image = this.playerForm.controls.image.value;
    this.passPlayer.emit(this.player);
    this.activeModal.close();
  }

}
