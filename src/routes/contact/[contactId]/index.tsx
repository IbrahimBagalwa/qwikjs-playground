import { Resource, component$, useResource$ } from '@builder.io/qwik'
import styles from '../contact.module.css'
import type { Contact } from '../fake-contact-db'
import { CONTACTS } from '../fake-contact-db'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const loc = useLocation()
  const contact = useResource$<Contact>(() => {
    const foundContact = CONTACTS.find(
      (contact) => contact.id === loc.params.contactId
    )
    return foundContact || Promise.reject('Contact not found')
  })
  return (
    <div>
      <h1>Contact Details</h1>
      <Resource
        value={contact}
        onPending={() => <div>Loading...</div>}
        onResolved={(contact) => (
          <div class={styles.content}>
            <img
              width='200'
              height='200'
              src={contact.avatar}
              alt={contact.name}
              class={styles.avatar}
            />
            <div>
              <p class={styles.name}>{contact.name}</p>
              <p class={styles.role}>{contact.role}</p>
              <div class={styles.link}>
                <a href={contact.twitter}>twitter</a>
                <span> | </span>
                <a href={contact.linkedin}>linkedin</a>
                <span> | </span>
                <a href={contact.github}>github</a>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
})
