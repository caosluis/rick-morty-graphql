import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  characterId: string | null = ''
  characterData: any = {}



  character: any = [];

  constructor(private activatedroute: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.characterId = this.activatedroute.snapshot.paramMap.get('id')
    this.apollo
      .query<any>({
        query: gql`
        query GetCharacter($id: ID!) {
          character(id: $id) {
            image
            name
            status
          }
        }
      `,
      variables: {
        id: this.characterId,
      },
      })
      .subscribe(({ data, loading, errors }) => {
        console.log(data);
        this.character= data?.character;        
      });
  }

}
