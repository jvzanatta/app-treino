import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { SportProvider } from '../sport/sport';
import { ExerciseProvider } from '../exercise/exercise';
import { HttpHandler } from '../http/http';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutProvider {

  private endpoint: string = 'workouts/';

  constructor(
    public http:      HttpHandler,
    private storage:  Storage,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
  }

  public getGivenWorkouts(): Promise<any> {
    // console.log('getGivenWorkouts');
    let promise = new Promise((resolve, reject) => {
      this.getWorkouts().then((allWorkouts: Array<any>) => {
        this.storage.get('givenWorkouts')
        .then(givenWorkouts => {
          let workoutList = allWorkouts.filter(workout => givenWorkouts.includes(workout.id));
          // console.log('workoutList', workoutList);
          resolve(workoutList)
        });
       });
    });
    return promise;
  }

  public getCreatedWorkouts(): Promise<any> {
    // console.log('getCreatedWorkouts');
    let promise = new Promise((resolve, reject) => {
      this.getWorkouts().then((allWorkouts: Array<any>) => {
        this.storage.get('createdWorkouts')
          .then(createdWorkouts => {
            // console.log('allWorkouts', allWorkouts);

            let workoutList = allWorkouts.filter(workout => createdWorkouts.includes(workout.id));
            // console.log('workoutList', workoutList);
            resolve(workoutList)
          });
      });
    });
    return promise;
  }

  private getWorkouts(): Promise<any> {
    return this.storage.get('workouts');
  }

  public getWorkoutList(mode: string): Promise<any> {
    return mode === 'coach' ? this.getCreatedWorkouts() : this.getGivenWorkouts();
  }

  public getWorkout(workoutId): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => allWorkouts.find(workout => workout.id == workoutId));
  }

  public getDayExercises(workout, day): Array<any> {
    return (workout.exercises || []).filter(exercise => exercise.pivot.day === day);
  }

  public getDayExerciseKeys(workout, day): Array<any> {
    return this.getDayExercises(workout, day).map(exercise => exercise = exercise.id);
  }

  public clearWorkoutDay(workout, day): Promise<any> {

    let filter = (exercise) => {
        if (exercise.pivot.day == day) {
          return false;
        } else {
          return true;
        }
      };

    workout.exercises = workout.exercises.filter(filter);

    return this.update(workout, 'clearedday');
  }

  public archive(workout, activeValue: boolean = false): Promise<any> {
    workout.active = activeValue;
    return this.update(workout, (activeValue ? 'unarchived' : 'archived'));
  }

  public update(workout, toast = 'uptated'): Promise<any> {
    return new Promise((resolve, reject) => {
      this.patch(workout).subscribe(updatedWorkout => {
        this.updateLocaly(updatedWorkout).then(() => {
          resolve(updatedWorkout);
          switch (toast) {
            case "uptated":
              this.showUpdatedToast();
              break;
            case "unarchived":
              this.showUnarchivedToast();
              break;
            case "archived":
              this.showArchivedToast();
              break;
            case "clearedday":
              this.showClearedDayToast();
              break;
            default:
              break;
          }
        });
      });
    });
  }

  private patch(workout): Observable<any> {
    return this.http.patch(this.endpoint + workout.id, workout);
  }

  private updateLocaly(updatedWorkout): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => {
        allWorkouts = allWorkouts
          .map(workout => (workout.id === updatedWorkout.id ? updatedWorkout : workout));

        return this.storage.set('workouts', allWorkouts);
      });
  }

  public create(workout): Promise<any> {
    return new Promise((resolve, reject) => {
      this.post(workout).subscribe(createdWorkout => {
        this.createLocaly(createdWorkout).then(() => {
          resolve(createdWorkout);
          this.showCreatedToast();
        });
      });
    });
  }

  private post(workout): Observable<any> {
    return this.http.post(this.endpoint, workout);
  }

  private createLocaly(createdWorkout): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => {
        // console.log('old allWorkouts', allWorkouts);
        allWorkouts.push(createdWorkout);
        // console.log('new allWorkouts', allWorkouts);
        return  this.storage.set('workouts', allWorkouts)
      }).then((teste) => {
        // console.log('teste storage set', teste);
        return this.storage.get('createdWorkouts')
      }).then(createdIds => {
        createdIds.push(createdWorkout.id);
        return this.storage.set('createdWorkouts', createdIds)
      });
  }

  public promptDelete(workout): Promise<any> {
    return new Promise ((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir a ficha ' + workout.name + '?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              // console.log('Disagree clicked');
              resolve(false);
            }
          },
          {
            text: 'Sim, excluir!',
            handler: () => {
              // console.log('Agree clicked');
              setTimeout(() =>
                this.remove(workout.id)
                  .then(result => resolve(result)), 100);
            }
          }
        ]
      });
      confirm.present();
    });
  }

  public remove(workoutId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.delete(workoutId).subscribe(() => {
        this.removeLocaly(workoutId).then(() => {
          resolve(true);
          this.showDeletedToast();
        });
      });
    });
  }

  private delete(workoutId): Observable<any> {
    return this.http.delete(this.endpoint + workoutId);
  }

  private removeLocaly(workoutId): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => {
        allWorkouts = allWorkouts.filter(workout => workout.id !== workoutId);
        return  this.storage.set('workouts', allWorkouts)
      }).then((teste) => {
        // console.log('teste storage set', teste);
        return this.storage.get('createdWorkouts')
      }).then(createdIds => {
        createdIds = createdIds.filter(id => id != workoutId);
        return this.storage.set('createdWorkouts', createdIds)
      });
  }

  private showSharedToast() {
    this.showToast('Ficha compartilhada!');
  }

  private showArchivedToast() {
    this.showToast('Ficha arquivada!');
  }

  private showUpdatedToast() {
    this.showToast('Ficha atualizada!');
  }

  private showCreatedToast() {
    this.showToast('Ficha cadastrada!');
  }

  private showUnarchivedToast() {
    this.showToast('Ficha desarquivada!');
  }

  private showDeletedToast() {
    this.showToast('Ficha excluída!');
  }

  private showClearedDayToast() {
    this.showToast('Dia limpo!');
  }

  private showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }
}
