import {Component, OnInit} from '@angular/core';
import {Player, PlayerService} from './player.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateUserComponent} from './create-user/create-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  players: Player[] = [];

  // VÝBĚR HRÁČŮ
  selectedPlayers = [];

  // ZAMÍCHANÝ VÝBĚR HRÁČŮ
  mixedPlayers = [];

  // TÝMY
  firstTeams = [];
  secondTeams = [];

  isGenerated = false;

  constructor(private playerService: PlayerService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.playerService.getPlayers()
      .subscribe(res => {
        Object.keys(res).map((key) => {
          this.players.push({ id: key, name: res[key].name, image: res[key].image });
        });
      });
  }

  selectedName(user) {
    if (this.selectedPlayers.includes(user)) {
      const index = this.selectedPlayers.indexOf(user);
      this.selectedPlayers.splice(index, 1);
    } else {
      this.selectedPlayers.push(user);
    }
  }

  generateOrder() {
    if (this.selectedPlayers.length < 2) {
      return;
    }
    this.isGenerated = true;
    this.mixedPlayers = [];
    this.firstTeams = [];
    this.secondTeams = [];
    const pocetHracu = this.selectedPlayers.length;

    for (let i = 0; i < pocetHracu; i++) {
      const index = Math.floor(Math.random() * this.selectedPlayers.length);

      this.mixedPlayers.push(this.selectedPlayers[index]);
      this.selectedPlayers.splice(index, 1);
    }
  }

  generateTeams() {
    if (this.selectedPlayers.length < 2 || this.selectedPlayers.length % 2 !== 0) {
      return;
    }
    this.isGenerated = true;
    this.mixedPlayers = [];
    this.firstTeams = [];
    this.secondTeams = [];

    const pocetHracu = this.selectedPlayers.length;

    for (let i = 0; i < pocetHracu; i++) {
      const index = Math.floor(Math.random() * this.selectedPlayers.length);

      if ((i === 0) || (i % 2 === 0)) {
        this.firstTeams.push(this.selectedPlayers[index]);
      } else {
        this.secondTeams.push(this.selectedPlayers[index]);
      }
      this.selectedPlayers.splice(index, 1);
    }
  }

  createPlayer() {
    const modalRef = this.modalService.open(CreateUserComponent);
    modalRef.componentInstance.editing = false;

    modalRef.componentInstance.passPlayer.subscribe(player => {
      this.playerService.createPlayer(player);
      this.players.push(player);
    });
  }

  editPlayer(p) {
    const modalRef = this.modalService.open(CreateUserComponent);
    modalRef.componentInstance.player = p;
    modalRef.componentInstance.editing = true;

    modalRef.componentInstance.passPlayer.subscribe(player => {
      this.playerService.updatePlayer(player);
      this.players.find(result => {
        if (result.id === player.id) {
          result = player;
        }
      });
    });
  }

  deletePlayer(p) {
    this.playerService.deletePlayer(p.id);
    if (this.players.includes(p)) {
      const index = this.players.indexOf(p);
      this.players.splice(index, 1);
    }
  }
}
