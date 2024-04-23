<template>
  <div>
    <Header/>
    <br>
    <Wrapper>
      <h1 class="text-center">Welcome, {{ userFirstName }} {{ userLastName }}!</h1>
      <div class="flex">
        <CounterCard :title="guestList.length + ' Guests Checked In'" :content="guestList.length + ' Overnight Stays'"/>
        <CounterCard :title="`${guestData.bunksAssigned} Bunks Assigned`"
                     :content="`${guestData.topBunksAvailable} Top Bunks Available ${guestData.bottomBunksAvailable} Bottom Bunks Available`"/>
        <CounterCard :title="`${guestData.lockersAssigned} Lockers Assigned`"
                     :content="`${guestData.dayLockersAvailable} Day Lockers Available ${guestData.storageLockersAvailable} Storage Lockers Available`"/>
      </div>

      <NoteSection NoteTitle="Guest Notes"/>
      <NoteSection NoteTitle="Guest Coordination"/>

      <br>
      <br>
      <NoteSection NoteTitle="Nightly Highlights"/>
      <NoteSection NoteTitle="New Guest Name and Introduction"/>
    </Wrapper>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'
import CounterCard from '../components/CounterCard.vue'
import NoteSection from '../components/NoteSection.vue'
import store from "../store/store.js";

export default {
  name: 'Dashboard',
  components: {
    Header,
    Wrapper,
    CounterCard,
    NoteSection
  },
  data() {
    return {
      userFirstName: "",
      userLastName: "",
      guestData: {
        guestsCheckedIn: 0,
        overnightStays: 0,
        servicesOnly: 0,
        bunksAssigned: 0,
        topBunksAvailable: 0,
        bottomBunksAvailable: 0,
        lockersAssigned: 0,
        dayLockersAvailable: 0,
        storageLockersAvailable: 0
      },
      guestList: [],
    }
  },
  async created() {
    store.dispatch("guestModule/getCurrent")
        .then((data) => {
          this.guestList = data.guests;
        })
        .catch((error) => {
          console.error("Error fetching guests:", error);
        });

    const cachedUser = JSON.parse(localStorage.getItem('user'));
    if (cachedUser) {
      this.userFirstName = cachedUser.firstName || '';
      this.userLastName = cachedUser.lastName || '';
    } else {
      console.error('User not found in local storage');
    }
  },
}
</script>
