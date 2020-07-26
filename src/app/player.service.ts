import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {
  }

  getPlayers() {
    return this.http.get('https://team-generator-v2.firebaseio.com/players.json');
  }

  createPlayer(player: Player) {
    return this.http.post('https://team-generator-v2.firebaseio.com/players.json/', player)
      .subscribe(u => console.log(u));
  }

  deletePlayer(id: string) {
    return this.http.delete('https://team-generator-v2.firebaseio.com/players/' + id + '.json')
      .subscribe(() => {},
        (error => { console.log('Záznamy se nepodařilo smazat'); }),
        () => { console.log('Záznamy smazány'); }
      );
  }
}

export interface Player {
  id?: string;
  name: string;
  image: string;
}
