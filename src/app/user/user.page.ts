import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


const CHARACTERS_QUERY = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  characters: any[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .query<any>({
        query: CHARACTERS_QUERY
      })
      .subscribe(({ data, loading, errors }) => {
        this.characters = data?.characters?.results;
      });
  }

}
